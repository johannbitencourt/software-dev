import { IUserCpfResponse } from "../../controllers/interfaces/responses/IUserResponse";
import { IUserRead } from "./IUser";

interface IAppointmentWhere {
  id: string;
  userId?: string;
}

interface IAppointmentData {
  email?: string;
  cpf?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  roleId?: string;
}

interface IAppointmentRead {
  id: string;
  status: string;
  creationDate: string;
  lastUpdate: string;
  users: IUserRead[];
  messages: IAppointmentMessageRead[];
}

interface IAppointmentMessageRead {
  postDate: string;
  message: string;
  user: IUserCpfResponse;
}

export { IAppointmentWhere, IAppointmentData, IAppointmentRead };
