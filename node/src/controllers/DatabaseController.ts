import { Request, Response } from "express";
import { DatabaseService } from "../services/DatabaseService";

class DatabaseController {
  async handle(request: Request, response: Response) {
    const service = new DatabaseService();
    const result = await service.execute();
    return response.json(result);
  }
}

export { DatabaseController };
