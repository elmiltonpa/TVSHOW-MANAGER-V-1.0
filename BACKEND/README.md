# Series Manager API - Backend

A robust, production-ready RESTful API built with **Node.js**, **Express**, and **TypeScript** for managing TV series tracking. This project follows industry best practices for security, architecture, and code quality.

## Features

- **Authentication & Authorization**: Secure user registration and login using JWT (JSON Web Tokens) and bcrypt for password hashing.
- **TV Series Management**: Integration with the TMDB (The Movie Database) API to fetch and track show details, seasons, and episodes.
- **Robust Security**: Implementation of `helmet` for secure HTTP headers and specialized middleware for request validation.
- **Centralized Error Handling**: Unified error response system for consistent API feedback.
- **Type Safety**: 100% written in TypeScript with strict typing for models, controllers, and services.
- **Database**: MongoDB integration using Mongoose with optimized schemas and validations.

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Package Manager**: pnpm
- **Tools**: JWT, Bcrypt, Helmet, Axios, ts-node-dev

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repository-url>
   cd BACKEND-TVSHOWMANAGER
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3001
   MONGODB_URI=your_mongodb_connection_string
   TMDB_API_KEY=your_tmdb_api_key
   JWT_SECRET=your_secret_key
   ```

4. **Run development mode**:
   ```bash
   pnpm dev
   ```

5. **Build for production**:
   ```bash
   pnpm build
   pnpm start
   ```

## API Endpoints

### Auth
- `POST /api/register` - Create a new user account.
- `POST /api/login` - Authenticate and receive a JWT.

### Series
- `GET /api/series/:userId` - Get all series tracked by a user.
- `POST /api/series` - Add a new series (Requires Auth).
- `PUT /api/series/:id` - Update series progress (Requires Auth).
- `DELETE /api/series/:id` - Remove a series from list (Requires Auth).

---

Developed as a showcase of modern backend engineering practices.
