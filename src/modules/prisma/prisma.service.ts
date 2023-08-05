import { PrismaClient } from "@prisma/client";
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: { url: process.env.DATABASE_URL }
      }
    })
  }
}
const prismaService = new PrismaService();

export default prismaService;