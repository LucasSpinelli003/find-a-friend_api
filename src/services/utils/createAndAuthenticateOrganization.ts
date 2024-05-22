import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";
export async function createAndAuthenticateOrganization(app: FastifyInstance) {
  await prisma.organization.create({
    data: {
      name: "teste",
      city: "sp",
      localization: "teste",
      phone: "teste",
      login: "asda",
      password: await hash("teste", 6),
    },
  });

  const auth = await request(app.server).post("/authenticate").send({
    login: "asda",
    password: "teste",
  });

  const { token } = auth.body;

  return token;
}
