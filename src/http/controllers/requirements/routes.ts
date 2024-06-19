import { FastifyInstance } from "fastify";
import { create } from "./create";
import { filterByPetId } from "./filterById";

export async function appRequirementRoutes(app: FastifyInstance) {
  app.post("/requirements", create);
  app.get("/requirements/:petId", filterByPetId);
}
