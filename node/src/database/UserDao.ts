import { User } from ".prisma/client";
import prismaClient from "../prisma";
import { AbstractModel } from "./AbstractModel";
import { IUserData, IUserWhere, IUserRead } from "./interfaces/IUser";

class UserDao extends AbstractModel<IUserWhere, IUserData, IUserRead, User> {
  constructor() {
    super(prismaClient.user);
    this.select = {
      email: true,
      cpf: true,
      firstName: true,
      lastName: true,
      role: {
        select: {
          description: true,
        },
      },
    };
  }

  public getSelectQuery(): object {
    return this.select;
  }
}

export { UserDao };
