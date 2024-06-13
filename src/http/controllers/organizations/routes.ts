import { FastifyInstance } from "fastify";
import { create } from "./create";
import { authenticate } from "./authenticate";
import { refresh } from "./refresh";
import { filterOrganizationId } from "./filterById";

export async function appOrganizationRoutes(app: FastifyInstance) {
  app.post("/organizations", create);
  app.post("/authenticate", authenticate);
  app.patch("/token/refresh", refresh);
  app.get("/organizations/:organizationId", filterOrganizationId);
}
