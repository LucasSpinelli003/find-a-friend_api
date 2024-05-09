import "dotenv/config";
import { Environment } from "vitest";
import { randomUUID } from "node:crypto";
import { execSync } from "node:child_process";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Provide database url");
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("schema", schema);

  return url.toString();
}

export default <Environment>{
  name: "prisma",
  async setup() {
    const randomSchema = randomUUID();
    const databaseUrl = generateDatabaseUrl(randomSchema);

    process.env.DATABASE_URL = databaseUrl;

    execSync("npx prisma migrate deploy");

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${randomSchema}" CASCADE`,
        );

        await prisma.$disconnect();
      },
    };
  },
  transformMode: "ssr",
};
