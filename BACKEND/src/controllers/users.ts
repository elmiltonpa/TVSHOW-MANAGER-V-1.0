import { Router, Request, Response, NextFunction } from "express";
import User from "../models/User.js";

const usersRouter = Router();

usersRouter.get("/:username", async (request: Request, response: Response, next: NextFunction) => {
  const { username } = request.params;

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return response.status(404).json({ error: "user not found" });
    }
    response.json(user);
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
