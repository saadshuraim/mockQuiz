# University Quiz Platform 🎓

A modern, interactive quiz platform designed specifically for university students. Built with React, Vite, and Express, featuring a beautiful university-themed UI.

## ✨ Features

- **Interactive Quiz Taking** - Engage with well-structured quizzes
- **Quiz Preview** - Review quizzes before starting
- **Modern UI** - University-themed design with vibrant colors and smooth animations
- **Responsive Design** - Works seamlessly on all devices
- **Dark/Light Mode** - Comfortable viewing in any environment
- **Real-time Progress** - Track your quiz progress as you go

## 🚀 Tech Stack

- **Frontend:**
  - React with TypeScript
  - Vite for blazing-fast development
  - TailwindCSS for styling
  - Radix UI for accessible components
  - Wouter for lightweight routing

- **Backend:**
  - Express.js
  - TypeScript
  - Node.js

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone [your-repo-url]
   cd PlanLayout
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5000](http://localhost:5000) in your browser

## 🛠️ Development

- **Development Mode:**
  ```bash
  npm run dev
  ```

- **Build for Production:**
  ```bash
  npm run build
  ```

- **Start Production Server:**
  ```bash
  npm start
  ```

## 🌐 Environment Variables

The following environment variables can be set:

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment mode (development/production)

## 📁 Project Structure

```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── contexts/     # React contexts
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility libraries
│   │   ├── pages/       # Page components
│   │   └── utils/       # Utility functions
│   └── index.html       # HTML entry point
├── server/              # Backend Express server
│   ├── routes.ts        # API routes
│   └── index.ts         # Server entry point
└── shared/              # Shared types and utilities
```

## 🎨 Theme Customization

The application uses a carefully crafted university theme with:
- Primary color (Vibrant Red): `hsl(350, 85%, 45%)`
- Accent color (Royal Blue): `hsl(220, 85%, 45%)`
- Custom gradients and animations
- Responsive card layouts
- Interactive UI elements

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.