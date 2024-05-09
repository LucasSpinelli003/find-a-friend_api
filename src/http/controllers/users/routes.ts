import { FastifyInstance } from "fastify";
import { template } from "./template";
export async function appUserRoutes(app: FastifyInstance) {
  app.post("/template", template);
}
