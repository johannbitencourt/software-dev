import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController {
  async create(request: Request, response: Response) {
    const service = new UserService();
    const result = await service.create(request.body);
    return response.json(result);
  }

  async update(request: Request, response: Response) {
    const service = new UserService();
    const result = await service.updateUser(request.body, request.user_id);
    return response.json(result);
  }

  async get(request: Request, response: Response) {
    const service = new UserService();
    const result = await service.getUser(request.user_id);
    return response.json(result);
  }

  async delete(request: Request, response: Response) {
    const service = new UserService();
    const result = await service.deleteUser(request.user_id);
    return response.json(result);
  }

  async login(request: Request, response: Response) {
    const service = new UserService();
    const result = await service.login(request.body);
    return response.json(result);
  }
}

export { UserController };
