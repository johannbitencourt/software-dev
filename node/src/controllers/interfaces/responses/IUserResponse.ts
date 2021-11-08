import { IUserRead } from "../../../database/interfaces/IUser";

interface IUserJwtResponse {
  token: string;
  user: IUserResponse;
}

interface IUserCpfResponse {
  cpf: string;
}

interface IUserResponse extends IUserRead {}

export { IUserJwtResponse, IUserResponse, IUserCpfResponse };
