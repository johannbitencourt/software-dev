import { IRoleRead } from "./IRole";

interface IUserWhere {
  id?: string;
  cpf?: string;
}

interface IUserData {
  email?: string;
  cpf?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  roleId?: string;
}

interface IUserRead {
  email: string;
  cpf: string;
  firstName: string;
  lastName: string;
  role: IRoleRead;
}

export { IUserWhere, IUserData, IUserRead };
