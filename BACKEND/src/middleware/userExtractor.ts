import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config.js";

export interface CustomRequest extends Request {
  userId?: string;
}

const userExtractor = (
  request: CustomRequest,
  _response: Response,
  next: NextFunction
): void => {
  const authorization = request.headers.authorization;
  let token = "";

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    token = authorization.substring(7);
  }

  try {
    const decodedToken = jwt.verify(token, config.JWT_SECRET) as { id: string };

    if (!token || !decodedToken.id) {
      next(new jwt.JsonWebTokenError("token missing or invalid"));
      return;
    }

    request.userId = decodedToken.id;
    next();
  } catch (error) {
    next(error);
  }
};

export default userExtractor;
