import { FastifyInstance } from "fastify";
import { create } from "./create";

export async function appRequirementRoutes(app: FastifyInstance) {
  app.post("/requirement", create);
}
