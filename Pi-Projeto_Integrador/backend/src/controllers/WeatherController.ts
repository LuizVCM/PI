import { Request, Response, NextFunction } from "express";
import { WeatherService } from "../services/WeatherService";

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
      const loggedUser = (req as any).user;
      console.log(loggedUser);
      const myWeathers = await this.weatherService.listByUserLogged(loggedUser.id);

      return res.status(200).json(myWeathers);
    } catch (error) {
      next(error);
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const cropId = Number(req.params.id);
      const { data, chuva, temperatura, vento, umidade } = req.body;

      const loggedUser = (req as any).user;

      const weather = await this.weatherService.create(
        { data, chuva, temperatura, vento, umidade },
        loggedUser.id,
        cropId
      );

      return res.status(201).json(weather);
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const { data, chuva, temperatura, vento, umidade } = req.body;
      const loggedUser = (req as any).user;

      const clima = await this.weatherService.update(
        id,
        { data, chuva, temperatura, vento, umidade },
        loggedUser.id
      );
      return res.json(clima);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await this.weatherService.delete(id);
      return res.status(204).send("Clima deletado com sucesso");
    } catch (erro) {
      next(erro);
    }
  }
}