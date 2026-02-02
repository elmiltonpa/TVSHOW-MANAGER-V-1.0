import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const errorHandler = (error: Error, _request: Request, response: Response, next: NextFunction) => {
  console.error(error.name, error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token missing or invalid" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  } else if (error.name === "TooManyRequestsError") {
    return response.status(429).json({ error: "too many requests, please try again later" });
  } else if (error instanceof mongoose.mongo.MongoServerError && error.code === 11000) {
    return response.status(400).json({ error: "username must be unique" });
  }

  response.status(500).json({ error: "something went wrong" });

  next(error);
};

export default errorHandler;