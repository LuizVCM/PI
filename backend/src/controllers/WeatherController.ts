import { Request, Response, NextFunction } from "express";
import { WeatherService } from "../services/WeatherService";
import { CreateWeatherDTO } from "../schemas/weather.schema";

export class WeatherController {
  private weatherService = new WeatherService();
  async listAll(req: Request, res: Response, next: NextFunction) {
    try {
      const weatherData = await this.weatherService.listAll();
      return res.json(weatherData);
    } catch (error) {
      next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const weatherData = await this.weatherService.getById(id);
      return res.json(weatherData);
    } catch (error) {
      next(error);
    }
  }
  async listMyWeathers(req: Request, res: Response, next: NextFunction) {
    try {
      const loggedUser = req.user!.id;
      const myWeathers = await this.weatherService.listByUserLogged(loggedUser);
      return res.status(200).json(myWeathers);
    } catch (error) {
      next(error);
    }
  }
  async listByTerritoryId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const weatherData = await this.weatherService.findByTerritoryId(id)
      return res.status(200).json(weatherData);
    } catch (error) {
      next(error);
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const loggedUser = req.user!.id;
      const id = Number(req.params.id);
      const createWeatherData = req.body as CreateWeatherDTO;
      const weatherData = await this.weatherService.create(createWeatherData, id);
      return res.status(201).json(weatherData);
    } catch (error) {
      next(error);
    }
  }
}