import { Appointment, User } from ".prisma/client";
import prismaClient from "../prisma";
import { AbstractModel } from "./AbstractModel";
import {
  IAppointmentData,
  IAppointmentWhere,
  IAppointmentRead,
} from "./interfaces/IAppointment";
import { UserDao } from "./UserDao";

class AppointmentDao extends AbstractModel<
  IAppointmentWhere,
  IAppointmentData,
  IAppointmentRead,
  Appointment
> {
  private selectDefault: object = {
    id: true,
    status: true,
    creationDate: true,
    lastUpdate: true,
    users: {
      select: {
        user: {
          select: new UserDao().getSelectQuery(),
        },
      },
    },
    messages: {
      select: {
        id: true,
        postDate: true,
        message: true,
        user: {
          select: {
            cpf: true,
          },
        },
      },
    },
  };

  constructor() {
    super(prismaClient.appointment);
    this.select = this.selectDefault;
  }

  public getSelectQuery(): object {
    return this.select;
  }

  public async readList(where: object) {
    return await prismaClient.userAppointmentRelation.findMany({
      where,
    });
  }

  public async remove(where: IAppointmentWhere): Promise<Appointment> {
    try {
      const appointment = <Appointment>await this.read(where, false);
      await this.deleteAllMessages({
        appointmentId: appointment.id,
      });
      await this.deleteAllUserRelations({
        appointmentId: appointment.id,
      });
      return await super.remove(where);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async insertMessage(body) {
    try {
      const user = await prismaClient.user.findFirst({
        where: { cpf: body.userCpf },
        include: { role: true },
      });
      const date = new Date().toLocaleString();
      if (user.role.description.toUpperCase() === "DOCTOR") {
        await prismaClient.userAppointmentRelation.create({
          data: { userId: user.id, appointmentId: body.appointmentId },
        });
      }
      await prismaClient.appointment.update({
        where: { id: body.appointmentId },
        data: { lastUpdate: date },
      });
      return await prismaClient.appointmentMessage.create({
        data: {
          message: body.message,
          userId: user.id,
          appointmentId: body.appointmentId,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async removeMessage(where: IAppointmentWhere) {
    try {
      return await prismaClient.appointmentMessage.delete({ where });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  private async deleteAllMessages(where: object) {
    const appointmentMessageList =
      await prismaClient.appointmentMessage.findMany({ where });
    for (let message of appointmentMessageList) {
      await prismaClient.appointmentMessage.delete({
        where: { id: message.id },
      });
    }
  }

  private async deleteAllUserRelations(where: object) {
    const appointmentUserList =
      await prismaClient.userAppointmentRelation.findMany({ where });
    for (let user of appointmentUserList) {
      await prismaClient.userAppointmentRelation.delete({
        where: { id: user.id },
      });
    }
  }
}

export { AppointmentDao };
