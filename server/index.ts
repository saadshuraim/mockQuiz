import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Setup error handling
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

// Initialize the app with routes and middleware
const init = async () => {
  await registerRoutes(app);

  if (process.env.NODE_ENV === "development") {
    const server = await import('http').then(http => http.createServer(app));
    await setupVite(app, server);
    
    const port = parseInt(process.env.PORT || '5000', 10);
    server.listen({
      port,
      host: "localhost",
    }, () => {
      log(`serving on port ${port}`);
    });
  } else {
    // In production on Vercel, just serve the API
    serveStatic(app);
  }
};

// Initialize in development, skip in production (Vercel)
if (process.env.NODE_ENV === "development") {
  init().catch(console.error);
}

// Export the Express app as a serverless handler
export default app;
