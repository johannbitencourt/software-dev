import { Role } from ".prisma/client";
import prismaClient from "../prisma";
import { AbstractModel } from "./AbstractModel";
import { IRoleData, IRoleWhere, IRoleRead } from "./interfaces/IRole";

class RoleDao extends AbstractModel<IRoleWhere, IRoleData, IRoleRead, Role> {
  constructor() {
    super(prismaClient.role);
    this.select = {
      description: true,
    };
  }
  public getSelectQuery(): object {
    return this.select;
  }
}

export { RoleDao };
