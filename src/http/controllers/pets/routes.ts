import { FastifyInstance } from "fastify";
import { create } from "./create";
import { filterByQuery } from "./filterByQuery";
import { filterById } from "./filterById";

export async function appPetRoutes(app: FastifyInstance) {
  app.post("/pets", create);
  app.get("/pets/search", filterByQuery);
  app.get("/pets/:petId", filterById);
}
