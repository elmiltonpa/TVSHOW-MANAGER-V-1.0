import { Router, Response, NextFunction } from "express";
import Serie from "../models/Serie.js";
import User from "../models/User.js";
import { getSerie } from "../api/apiService.js";
import userExtractor, { CustomRequest } from "../middleware/userExtractor.js";

const seriesRouter = Router();

seriesRouter.get(
  "/:id",
  async (request: CustomRequest, response: Response, next: NextFunction) => {
    const { id } = request.params;

    try {
      const series = await Serie.find({ user: id });
      response.json(series);
    } catch (error) {
      next(error);
    }
  },
);

seriesRouter.post(
  "/",
  userExtractor,
  async (request: CustomRequest, response: Response, next: NextFunction) => {
    const { language, ...serie } = request.body;
    const { userId } = request;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return response.status(404).json({ error: "user not found" });
      }

      const serieApi = await getSerie(serie.tv_id, language);
      const episodes = serieApi.seasons
        .map((season) => {
          if (season.season_number !== 0) {
            return new Array(season.episode_count).fill(false);
          }
          return null;
        })
        .filter((season): season is boolean[] => season !== null);

      const newSerie = new Serie({
        tv_title: serieApi.name,
        tv_id: String(serieApi.id),
        episode: 1,
        season: 1,
        watched: false,
        favorite: false,
        watching: episodes,
        user: user._id,
      });

      const savedSerie = await newSerie.save();

      user.series = user.series.concat(savedSerie._id);
      await user.save();
      response.status(201).json(savedSerie);
    } catch (error) {
      next(error);
    }
  },
);

seriesRouter.put(
  "/:id",
  userExtractor,
  async (request: CustomRequest, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const serie = request.body;

    try {
      const serieUpdated = await Serie.findByIdAndUpdate(id, serie, {
        new: true,
        runValidators: true,
        context: "query",
      });
      response.json(serieUpdated);
    } catch (error) {
      next(error);
    }
  },
);

seriesRouter.delete(
  "/:id",
  userExtractor,
  async (request: CustomRequest, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const { userId } = request;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return response.status(404).json({ error: "user not found" });
      }
      const serieIndex = user.series.findIndex((s) => s.toString() === id);

      if (serieIndex !== -1) {
        user.series.splice(serieIndex, 1);
        await user.save();

        await Serie.findByIdAndDelete(id);

        return response.status(204).end();
      } else {
        return response
          .status(404)
          .json({ error: "Serie not found in user's series" });
      }
    } catch (error) {
      next(error);
    }
  },
);

export default seriesRouter;
