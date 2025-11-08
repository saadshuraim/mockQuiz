# MockQuiz

## Overview

MockQuiz is a client-side web application for creating and taking quizzes with complete privacy. The app runs entirely in the browser using localStorage for data persistence, requiring no server backend or user accounts. Users can generate quiz content using AI assistants (via a provided prompt template), paste or upload quiz data in multiple formats (JSON, CSV, TXT), and take quizzes with instant auto-grading and detailed results review.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server with HMR (Hot Module Replacement)
- Client-side routing using Wouter (lightweight alternative to React Router)
- Path aliases configured for clean imports (`@/`, `@shared/`, `@assets/`)

**State Management:**
- React Context API for global quiz state (`QuizContext` manages parsed questions during the upload-to-preview workflow)
- Local component state with `useState` for UI interactions
- TanStack Query (React Query) configured but minimal backend interaction (application is primarily client-side)

**UI Component System:**
- Shadcn UI components (New York style variant) with Radix UI primitives
- Tailwind CSS for styling with custom design tokens matching design guidelines
- Custom color palette: Teal (#14B8A6) for primary actions, Deep Indigo (#312E81) for headings, Soft Coral (#FF7A7A) for errors, Warm Yellow (#FBBF24) for success states
- Typography: Poppins for headings (bold), Inter for body text
- Responsive design with mobile-first approach

**Data Flow:**
1. Upload page: User pastes text or uploads file → Parser validates and converts to Question[] format
2. Preview page: Questions displayed for review → User adds title/description → Data saved to localStorage
3. Dashboard: Displays saved quizzes and recent attempts from localStorage
4. Quiz taking: Questions loaded from localStorage → Answers tracked in component state → Results saved as Attempt object
5. Results page: Attempt data retrieved and displayed with detailed review

### Data Storage Solution

**Client-Side Storage (localStorage):**
- `mockquiz_quizzes`: JSON array of Quiz objects containing questions and metadata
- `mockquiz_attempts`: JSON array of Attempt objects containing quiz results

**Data Models:**
```typescript
Quiz {
  id: string (generated)
  title: string
  description?: string
  questions: Question[]
  createdAt: number
}

Question {
  id: string
  question: string
  options: { [key: string]: string }  // e.g., { a: "Answer 1", b: "Answer 2" }
  answer: string  // correct option key (lowercase)
  explanation?: string
  category?: string
  level?: string
}

Attempt {
  id: string (generated)
  quizId: string
  quizTitle: string
  finishedAt: number (timestamp)
  score: number
  totalQuestions: number
  answers: AttemptAnswer[]
}

AttemptAnswer {
  questionId: string
  selectedKey: string
  correctBool: boolean
}
```

**Storage Operations:**
- All CRUD operations abstracted in `utils/storage.ts`
- Data persistence via JSON stringify/parse
- No server synchronization - purely local storage
- Backup/export functionality for data portability

### Quiz Parsing System

**Multi-Format Parser (`utils/quizParser.ts`):**
- **JSON Detection:** Checks for array/object syntax, validates required fields (question, options, answer)
- **CSV Parsing:** Uses PapaParse library to handle CSV with headers (question, option_a-d, answer, explanation)
- **Text Format:** Custom parser for simple text-based quiz format
- Error handling with descriptive messages for validation failures
- Automatic ID generation for questions without IDs

**Workflow:**
1. User pastes content or selects file
2. Parser detects format based on content structure
3. Validation ensures all required fields present
4. Normalized to Question[] array
5. Stored in QuizContext for preview
6. After title/description added, persisted to localStorage

### Authentication & Authorization

**Not Applicable:** Application has no user accounts, authentication, or authorization. All data is stored locally in the browser with no backend communication.

### Theme System

**Dark/Light Mode:**
- CSS variable-based theming in `index.css`
- Theme toggle in Header component
- Preference persisted to localStorage (`theme` key)
- Applied via class on `<html>` element (`dark` class)
- Tailwind configured with `darkMode: ["class"]`

## External Dependencies

### UI Component Libraries
- **Radix UI**: Headless UI primitives for accessible components (dialogs, dropdowns, accordions, etc.)
- **Shadcn UI**: Pre-styled component library built on Radix UI
- **Lucide React**: Icon library for consistent iconography

### Styling & Utilities
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **class-variance-authority**: Type-safe variant management for component styling
- **clsx** & **tailwind-merge**: Utility functions for conditional className composition

### Data Processing
- **PapaParse**: CSV parsing library for quiz file uploads
- **date-fns**: Date formatting and manipulation utilities
- **Zod**: Schema validation (configured with Drizzle but minimal usage in current client-only architecture)

### State & Routing
- **TanStack Query (React Query)**: Async state management (configured but minimal use due to client-side nature)
- **Wouter**: Lightweight client-side routing
- **React Hook Form** + **@hookform/resolvers**: Form state management and validation (available but not extensively used)

### Database (Configured but Unused)
- **Drizzle ORM**: PostgreSQL ORM with schema defined in `shared/schema.ts`
- **@neondatabase/serverless**: Neon database driver
- **Note:** Database infrastructure is configured but NOT actively used. The application is 100% client-side with localStorage persistence. This setup may be for future expansion or was scaffolded from a template.

### Development Tools
- **Vite Plugins**: Runtime error overlay, development banner (Replit-specific tooling)
- **TypeScript**: Type checking with strict mode enabled
- **ESBuild**: Production bundling for server entry (though server has minimal routes)

### Backend (Minimal)
- **Express**: HTTP server serving static files and Vite dev middleware
- **Note:** Server exists primarily to serve the SPA. No API routes are actively implemented despite route infrastructure in `server/routes.ts`.