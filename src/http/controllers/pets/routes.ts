import { FastifyInstance } from "fastify";
import { create } from "./create";
import { filterByQuery } from "./filterByQuery";
import { filterById } from "./filterById";
import { filterByCity } from "./filterByCity";
import { verifyJwt } from "@/http/middlewares/verify-jwt";

export async function appPetRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.post("/pets", create);
  app.get("/pets/search", filterByQuery);
  app.get("/pets/:petId", filterById);
  app.get("/pets/city/:city", filterByCity);
}
