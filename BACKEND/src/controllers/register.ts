import bcrypt from "bcrypt";
import User from "../models/User.js";
import { Router, Request, Response, NextFunction } from "express";

const registerRouter = Router();

registerRouter.post("/", async (request: Request, response: Response, next: NextFunction) => {
  const { username, name, password } = request.body;

  if (!username || !password || !name) {
    return response.status(400).json({
      error: "AUTH_MISSING_FIELDS",
    });
  }

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return response.status(400).json({
        error: "AUTH_USERNAME_TAKEN",
      });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();
    response.status(201).json({ message: "Successful registration", savedUser });
  } catch (error) {
    next(error);
  }
});

export default registerRouter;
