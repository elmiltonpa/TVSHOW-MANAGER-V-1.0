# TV Show Manager 📺

A modern Full-Stack application for tracking TV series, managing favorites, and monitoring episode progress. Built with a robust **MERN Stack** (MongoDB, Express, React, Node.js) and fully typed with **TypeScript**.

**Live Demo:** [https://tvshow-manager.vercel.app/home](https://tvshow-manager.vercel.app/home)

---

## 🚀 Tech Stack Overview

This project is structured as a **Monorepo** containing both the Frontend and Backend applications.

| Component | Tech Stack |
|-----------|------------|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Context API |
| **Backend** | Node.js, Express 5, MongoDB (Mongoose), TypeScript, JWT Auth |
| **Infrastructure** | Vercel Deployment, Serverless Functions support |

## 📂 Project Structure

- **[`FRONTEND/`](./FRONTEND/README.md)**: The React Single Page Application (SPA). Handles UI, auth flow, and TMDB integration.
- **[`BACKEND/`](./BACKEND/README.md)**: The REST API. Handles data persistence, user authentication, and secure business logic.

> For detailed documentation on specific features or architecture, please refer to the `README.md` inside each folder.

---

## 🛠️ Quick Start

To run this project locally, you need to set up both the backend and frontend services.

### Prerequisites
- Node.js (v18 or higher recommended, v22 supported)
- pnpm (recommended) or npm
- A MongoDB database URI
- A TMDB API Key

### 1. Setup Backend
```bash
cd BACKEND
pnpm install

# Create .env file
# PORT=3001
# MONGODB_URI=your_mongo_uri
# TMDB_API_KEY=your_tmdb_key
# JWT_SECRET=your_secret
# ALLOWED_ORIGIN=http://localhost:5173

pnpm dev
# Server runs on http://localhost:3001
```

### 2. Setup Frontend
```bash
cd FRONTEND
pnpm install

# Create .env file
# VITE_BACKEND_URL=http://localhost:3001/api

pnpm dev
# App runs on http://localhost:5173
```

---

## 🔒 Environment Variables

You need to configure environment variables for both applications.

**Backend (`BACKEND/.env`):**
- `MONGODB_URI`: Connection string for MongoDB Atlas.
- `TMDB_API_KEY`: API Key from The Movie Database.
- `JWT_SECRET`: Secret string for signing session tokens.
- `ALLOWED_ORIGIN`: URL of the frontend (e.g., `http://localhost:5173` for local).

**Frontend (`FRONTEND/.env`):**
- `VITE_BACKEND_URL`: URL of your API (e.g., `http://localhost:3001/api`).

---

## ✨ Key Features
- **User Authentication:** Secure signup/login with JWT and session management.
- **Series Tracking:** Mark episodes or entire seasons as watched.
- **Favorites System:** Save your favorite shows.
- **Real-time Search:** Integrated with TMDB API.
- **Responsive UI:** Dark mode enabled and mobile-friendly interface.
