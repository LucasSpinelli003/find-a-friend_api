import { FastifyInstance } from "fastify";
import { create } from "./create";

export async function appPetRoutes(app: FastifyInstance) {
  app.post("/pets", create);
}
