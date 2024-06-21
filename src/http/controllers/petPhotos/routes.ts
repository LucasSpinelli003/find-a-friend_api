import { FastifyInstance } from "fastify";
import { create } from "./create";
import { filterByPetId } from "./filterByPetId";

export async function petPhotosRoutes(app: FastifyInstance) {
  app.post("/pet/:petId/photos", create);
  app.get("/pet/petId/photos", filterByPetId);
}
