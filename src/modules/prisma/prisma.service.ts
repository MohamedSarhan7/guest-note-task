import { PrismaClient } from "@prisma/client";

const prismaService = new PrismaClient({
  datasources: {
    db: { url: process.env.DATABASE_URL }
  }
});

export default prismaService;