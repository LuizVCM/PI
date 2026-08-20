import { Request, Response, NextFunction } from "express";
import { WeatherService } from "../services/WeatherService";
import { CreateWeatherDTO, UpdateWeatherDTO } from "../schemas/weather.schema";

export class WeatherController {
  private weatherService = new WeatherService();
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const weather = await this.weatherService.listAll();
      return res.json(weather);
    } catch (error) {
      next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const weather = await this.weatherService.getById(id);
      return res.json(weather);
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
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const loggedUser = req.user!.id;
      const id = Number(req.params.id);
      const createWeatherData = req.body as CreateWeatherDTO;
      const weather = await this.weatherService.create(
        createWeatherData,
        id
      );
      return res.status(201).json(weather);
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const loggedUser = req.user!.id;
      const id = Number(req.params.id);
      const updateWeatherData = req.body as UpdateWeatherDTO;
      const clima = await this.weatherService.update(
        id,
        updateWeatherData,
        loggedUser
      );
      return res.json(clima);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const loggedUser = req.user!.id;
      const id = Number(req.params.id);
      await this.weatherService.delete(id, loggedUser);
      return res.status(204).send("Clima deletado com sucesso");
    } catch (erro) {
      next(erro);
    }
  }
}