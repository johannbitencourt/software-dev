import { Request, Response } from "express";
import { AppointmentService } from "../services/AppointmentService";

class AppointmentController {
  async listAppointments(request: Request, response: Response) {
    const service = new AppointmentService();
    const result = await service.listAppointments(request.user_id);
    return response.json(result);
  }

  async startAppointment(request: Request, response: Response) {
    const service = new AppointmentService();
    const result = await service.startAppointment(
      request.body,
      request.user_id
    );
    return response.json(result);
  }

  async getAppointment(request: Request, response: Response) {
    const service = new AppointmentService();
    const result = await service.getAppointment(request.params.appointmentId);
    return response.json(result);
  }

  async updateAppointment(request: Request, response: Response) {
    const service = new AppointmentService();
    const result = await service.updateAppointment(
      request.body,
      request.params.appointmentId
    );
    return response.json(result);
  }

  async deleteAppointment(request: Request, response: Response) {
    const service = new AppointmentService();
    const result = await service.deleteAppointment(
      request.params.appointmentId
    );
    return response.json(result);
  }

  async insertMessage(request: Request, response: Response) {
    const service = new AppointmentService();
    const result = await service.insertMessage(request.body);
    return response.json(result);
  }

  async deleteMessage(request: Request, response: Response) {
    const service = new AppointmentService();
    const result = await service.deleteMessage(request.params.messageId);
    return response.json(result);
  }
}

export { AppointmentController };
