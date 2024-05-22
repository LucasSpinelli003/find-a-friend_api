import { FastifyInstance } from "fastify";
import { create } from "./create";
import { authenticate } from "./authenticate";

export async function appOrganizationRoutes(app: FastifyInstance) {
  app.post("/organizations", create);
  app.post("/authenticate", authenticate);
}
