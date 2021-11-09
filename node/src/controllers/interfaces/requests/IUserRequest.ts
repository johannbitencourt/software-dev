interface IUserLoginRequestBody {
  cpf: string;
  password: string;
}

interface IUserCreateUpdateRequestBody {
  status?: number;
  email?: string;
  cpf: string;
  firstName: string;
  lastName?: string;
  password: string;
  old_password?: string;
  role: string;
}

export { IUserLoginRequestBody, IUserCreateUpdateRequestBody };
