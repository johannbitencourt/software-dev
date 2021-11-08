import { Prisma } from ".prisma/client";
import { IErrorResponse } from "../controllers/interfaces/responses/IErrorResponse";
import { IModel } from "./interfaces/IModel";

abstract class AbstractModel<RRI, CUI, O, OM>
  implements IModel<RRI, CUI, O, OM>
{
  private functionModel: any;
  protected select: object;

  constructor(functionModel: any) {
    this.functionModel = functionModel;
  }

  public async create(data: CUI): Promise<OM> {
    try {
      return await this.functionModel.create({ data });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async read(where: RRI, asResponse: boolean = true): Promise<O | OM> {
    try {
      return await this.functionModel.findFirst({
        where,
        select: asResponse ? this.select : undefined,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async update(where: RRI, data: CUI): Promise<OM> {
    try {
      return await this.functionModel.update({ where, data });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async remove(where: RRI): Promise<OM> {
    try {
      return await this.functionModel.delete({ where });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export { AbstractModel };
