import prismaClient from "../prisma";

class DatabaseService {
  async execute() {
    return this.createRoles();
  }

  private async createRoles() {
    try {
      const role = await prismaClient.role.create({
        data: {
          description: "PATIENT",
        },
      });

      const doctorRole = await prismaClient.role.create({
        data: {
          description: "DOCTOR",
        },
      });
      return { role, doctorRole };
    } catch (error) {
      return { stack: error.message, error: error };
    }
  }
}

export { DatabaseService };
