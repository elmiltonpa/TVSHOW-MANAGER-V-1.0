# Project Context: TV Show Manager

## Overview
TV Show Manager is a full-stack web application for tracking TV series, monitoring episodes, and managing user favorites. It is a monorepo containing a React frontend and a Node.js/Express backend, built with TypeScript and the MERN stack.

## Architecture

### Backend (`BACKEND/`)
*   **Framework:** Node.js with Express 5.
*   **Language:** TypeScript.
*   **Database:** MongoDB with Mongoose (ODM).
*   **Authentication:** JWT (JSON Web Tokens) with `bcrypt` for password hashing.
*   **Security:** `helmet` for headers, `cors` for cross-origin requests, and `express-rate-limit` for DDoS protection.
*   **Deployment:** Configured for Vercel (serverless function export).
*   **Key Files:**
    *   `index.ts`: Entry point, app configuration, middleware setup.
    *   `src/mongoConfig.ts`: Database connection logic.
    *   `src/controllers/`: Route handlers (login, register, series, users).
    *   `src/models/`: Mongoose schemas (User, Serie).
    *   `src/middleware/`: Custom middleware (errorHandler, userExtractor).

### Frontend (`FRONTEND/`)
*   **Framework:** React 18 with Vite.
*   **Language:** TypeScript.
*   **Styling:** Tailwind CSS.
*   **Routing:** `react-router-dom`.
*   **State Management:** React Context API (`AuthContext`).
*   **API Client:** Axios with interceptors for automatic JWT injection and error handling.
*   **Internationalization:** `i18next`.
*   **Key Files:**
    *   `src/main.tsx`: App entry point, providers setup.
    *   `src/api/axiosClient.ts`: Configured Axios instance.
    *   `src/context/AuthContext.tsx`: Authentication state management.
    *   `src/components/`: Reusable UI components organized by feature (common, home, detail, etc.).

## Building and Running

### Prerequisites
*   Node.js (v18+)
*   pnpm (recommended) or npm
*   MongoDB Instance
*   TMDB API Key

### Backend Setup
1.  Navigate to `BACKEND/`.
2.  Install dependencies: `pnpm install`.
3.  Configure `.env` (see `BACKEND/.env.example`):
    *   `PORT`, `MONGODB_URI`, `TMDB_API_KEY`, `JWT_SECRET`, `ALLOWED_ORIGIN`.
4.  Run in development: `pnpm dev` (uses `tsx watch`).
5.  Build and start: `pnpm build && pnpm start`.

### Frontend Setup
1.  Navigate to `FRONTEND/`.
2.  Install dependencies: `pnpm install`.
3.  Configure `.env` (see `FRONTEND/.env.example`):
    *   `VITE_BACKEND_URL`: URL of the backend API.
4.  Run in development: `pnpm dev`.
5.  Build: `pnpm build`.

## Development Conventions

*   **TypeScript:** Strict typing is enforced across the entire codebase.
*   **Formatting:** Prettier/ESLint are used (implied by configuration files).
*   **API Structure:** RESTful API design.
*   **Authentication Flow:**
    *   User logs in -> Backend issues JWT.
    *   Frontend stores JWT in `localStorage` ("session").
    *   Axios interceptor attaches `Authorization: Bearer <token>` to requests.
    *   401 responses trigger auto-logout (unless on auth routes).
*   **Database Models:**
    *   Mongoose schemas strip `_id`, `__v`, and sensitive fields (like `passwordHash`) in `toJSON` transform.
*   **Git Workflow:** Monorepo structure, changes are often full-stack.
