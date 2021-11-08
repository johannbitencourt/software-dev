import { AppointmentDao } from "../database/AppointmentDao";
import prismaClient from "../prisma";

class AppointmentService {
  private appointmentDao: AppointmentDao;

  constructor() {
    this.appointmentDao = new AppointmentDao();
  }

  async listAppointments(userId) {
    const user = await prismaClient.user.findFirst({
      where: { id: userId },
      include: { role: true },
    });
    let where;
    if (user.role.description.toUpperCase() === "DOCTOR") {
      where = { OR: [{ userId }, { appointment: { status: "new" } }] };
    } else {
      where = { userId };
    }
    return await this.appointmentDao.readList(where);
  }

  async startAppointment(body, userId) {
    const user = await prismaClient.user.findFirst({
      where: { id: userId },
      include: { role: true },
    });

    if (user.role.description.toUpperCase() === "DOCTOR") {
      return { message: "Doctors are not allowed to create appointment" };
    }

    const appointmentRelationList =
      await prismaClient.userAppointmentRelation.findMany({
        where: { userId: userId },
        include: { appointment: true },
      });
    if (
      appointmentRelationList.some(
        (appointmentRelation) =>
          appointmentRelation.appointment.status === "new"
      )
    ) {
      return {
        message:
          "Patients are not allowed to create appointment while they are already in another appointment running",
      };
    }

    const result = await Promise.resolve(
      prismaClient.appointment.create({ data: { status: "new" } })
    )
      .then((appointment) =>
        prismaClient.userAppointmentRelation.create({
          data: { appointmentId: appointment.id, userId },
        })
      )
      .then((userAppointmentRelation) =>
        prismaClient.appointmentMessage.create({
          data: {
            userId: userAppointmentRelation.userId,
            appointmentId: userAppointmentRelation.appointmentId,
            message: body.message,
          },
        })
      )
      .then((appointmentMessage) =>
        this.getAppointment(appointmentMessage.appointmentId)
      );

    return result;
  }

  public async getAppointment(appointmentId: string) {
    return await this.appointmentDao.read({ id: appointmentId });
  }

  public async updateAppointment(body: any, appointmentId: string) {
    return await this.appointmentDao.update({ id: appointmentId }, body);
  }

  public async deleteAppointment(appointmentId: string) {
    return await this.appointmentDao.remove({ id: appointmentId });
  }

  public async insertMessage(body: any) {
    return await this.appointmentDao.insertMessage(body);
  }

  public async deleteMessage(messageId: string) {
    return await this.appointmentDao.removeMessage({ id: messageId });
  }
}
export { AppointmentService };
