import { FastifyInstance } from "fastify";
import { create } from "./create";
import { filterByQuery } from "./filterByQuery";

export async function appPetRoutes(app: FastifyInstance) {
  app.post("/pets", create);
  app.get("/pets/search", filterByQuery);
}
