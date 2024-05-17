import { PrismaPetsRepository } from "@/repositories/prisma/pets-prisma-repository";
import { FilterPetsByCityService } from "../filterPetsByCity";

export function makeFilterPetsByCity() {
  const prismaPetRepository = new PrismaPetsRepository();
  const service = new FilterPetsByCityService(prismaPetRepository);

  return service;
}
