import config from "./src/config.js";
import "./src/mongoConfig.js";
import registerRouter from "./src/controllers/register.js";
import usersRouter from "./src/controllers/users.js";
import loginRouter from "./src/controllers/login.js";
import seriesRouter from "./src/controllers/series.js";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import unknownEndpoint from "./src/middleware/unknownEndpoint.js";
import errorHandler from "./src/middleware/errorHandler.js";

import express from "express";

const app = express();

// Required for Vercel/proxies to correctly identify client IP
app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  validate: { xForwardedForHeader: false }, // Fix for Vercel logs
  message: { error: "too many requests, please try again later" },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20, // Increased slightly for usability
  standardHeaders: "draft-7",
  legacyHeaders: false,
  validate: { xForwardedForHeader: false }, // Fix for Vercel logs
  message: { error: "too many login attempts, please try again later" },
});

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    config.ALLOWED_ORIGIN,
  ].filter((origin) => origin !== undefined) as string[],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(limiter);

app.use("/api/login", authLimiter, loginRouter);
app.use("/api/register", authLimiter, registerRouter);
app.use("/api/users", usersRouter);
app.use("/api/series", seriesRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = config.PORT;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
