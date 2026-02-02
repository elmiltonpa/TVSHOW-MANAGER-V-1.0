import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import config from "../config.js";

const loginRouter = Router();

loginRouter.post("/", async (request: Request, response: Response, next: NextFunction) => {
  const { username, password } = request.body;

  try {
    const user = await User.findOne({ username });

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: "invalid user or password",
      });
    }

    const userForToken = {
      id: user._id,
      username: user.username,
    };

    const token = jwt.sign(userForToken, config.JWT_SECRET, { expiresIn: "24h" });

    response.status(200).send({
      name: user.name,
      username: user.username,
      token,
    });
  } catch (error) {
    next(error);
  }
});

export default loginRouter;
