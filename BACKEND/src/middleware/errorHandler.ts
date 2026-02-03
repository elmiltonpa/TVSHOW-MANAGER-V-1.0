import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

interface MongoError extends Error {
  code?: number;
}

const errorHandler = (
  error: MongoError,
  _request: Request,
  response: Response,
  _next: NextFunction
): void => {
  console.error(error.name, error.message);

  if (error.name === "CastError") {
    response.status(400).send({ error: "malformatted id" });
    return;
  }
  
  if (error.name === "ValidationError") {
    response.status(400).json({ error: error.message });
    return;
  }
  
  if (error.name === "JsonWebTokenError") {
    response.status(401).json({ error: "token missing or invalid" });
    return;
  }
  
  if (error.name === "TokenExpiredError") {
    response.status(401).json({ error: "token expired" });
    return;
  }
  
  if (error.name === "TooManyRequestsError") {
    response.status(429).json({ error: "too many requests, please try again later" });
    return;
  }
  
  if (error instanceof mongoose.mongo.MongoServerError && error.code === 11000) {
    response.status(400).json({ error: "username must be unique" });
    return;
  }

  response.status(500).json({ error: "something went wrong" });
};

export default errorHandler;
