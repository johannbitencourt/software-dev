import { Role, User } from ".prisma/client";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";
import {
  IUserLoginRequestBody,
  IUserCreateUpdateRequestBody,
} from "../controllers/interfaces/requests/IUserRequest";
import {
  IUserJwtResponse,
  IUserResponse,
} from "../controllers/interfaces/responses/IUserResponse";
import { IErrorResponse } from "../controllers/interfaces/responses/IErrorResponse";
import { UserDao } from "../database/UserDao";
import { IUserRead } from "../database/interfaces/IUser";
import { RoleDao } from "../database/RoleDao";

class UserService {
  private userDao: UserDao;
  private roleDao: RoleDao;

  constructor() {
    this.userDao = new UserDao();
    this.roleDao = new RoleDao();
  }

  async login(
    body: IUserLoginRequestBody
  ): Promise<IUserJwtResponse | IErrorResponse> {
    let user: User = <User>await this.userDao.read({ cpf: body.cpf }, false);

    if (!user) {
      return { message: "User not found" };
    } else if (user.password !== body.password) {
      return { message: "Wrong Password" };
    }

    return await this.concatTokenWithUser(this.generateToken(user), user);
  }

  async create(
    body: IUserCreateUpdateRequestBody
  ): Promise<IUserJwtResponse | IErrorResponse> {
    if (await this.userDao.read({ cpf: body.cpf })) {
      return { message: "User already exists" };
    }

    return await Promise.resolve(this.getRoleByDescription(body.role))
      .then((role: Role) =>
        this.userDao.create({
          email: body.email,
          cpf: body.cpf,
          firstName: body.firstName,
          lastName: body.lastName,
          password: body.password,
          roleId: role.id,
        })
      )
      .then((user: User) =>
        this.concatTokenWithUser(this.generateToken(user), user)
      );
  }

  async deleteUser(userId: string) {
    return await this.userDao.remove({ id: userId });
  }

  async getUser(userId: string): Promise<IUserResponse> {
    return <IUserRead>await this.userDao.read({ id: userId });
  }

  async updateUser(
    body: IUserCreateUpdateRequestBody,
    userId: string
  ): Promise<IUserRead | IErrorResponse> {
    if (body.old_password) {
      const user = <User>await this.userDao.read({ id: userId }, false);
      if (body.old_password !== user.password)
        return { message: "Wrong old password" };
    }

    let roleId;
    if (body.role) {
      const role = await this.getRoleByDescription(body.role);
      if (!role) return { message: "Role unexpected" };
      roleId = role.id;
    }

    const userModel: User = await this.userDao.update(
      { id: userId },
      {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        password: body.password,
        roleId: roleId,
      }
    );

    return <IUserRead>await this.userDao.read({ cpf: userModel.cpf });
  }

  private async concatTokenWithUser(token: string, user: User) {
    let userResponse = <IUserRead>await this.userDao.read({ cpf: user.cpf });
    return { token, user: userResponse };
  }

  private generateToken(user: User): string {
    const token = sign(
      { user: { id: user.id, cpf: user.cpf } },
      process.env.JWT_HASH,
      {
        subject: user.id,
        expiresIn: "2d",
      }
    );

    return token;
  }

  private async getRoleByDescription(description: string): Promise<Role> {
    return <Role>(
      await this.roleDao.read({ description: description.toUpperCase() }, false)
    );
  }
}
export { UserService };
