import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config.js";

export interface CustomRequest extends Request {
  userId?: string;
}

const userExtractor = (request: CustomRequest, _response: Response, next: NextFunction) => {
  const authorization = request.get("authorization");
  let token = "";

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    token = authorization.substring(7);
  }

  try {
    const decodedToken = jwt.verify(token, config.JWT_SECRET) as { id: string };

    if (!token || !decodedToken.id) {
      return next(new jwt.JsonWebTokenError("token missing or invalid"));
    }

    request.userId = decodedToken.id;

    next();
  } catch (error) {
    next(error);
  }
};

export default userExtractor;