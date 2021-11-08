import { IUserCpfResponse, IUserResponse } from "./IUserResponse";

interface IAppointmentBasicResponse {
  id: string;
  status: string;
  creationDate: string;
  lastUpdate: string;
}

interface IAppointmentDetailsResponse {
  id: string;
  status: string;
  creationDate: string;
  lastUpdate: string;
  users: IUserResponse[];
  messages: IAppointmentMessageResponse[];
}

interface IAppointmentMessageResponse {
  postDate: string;
  message: string;
  user: IUserCpfResponse;
}

export {
  IAppointmentBasicResponse,
  IAppointmentDetailsResponse,
  IAppointmentMessageResponse,
};
