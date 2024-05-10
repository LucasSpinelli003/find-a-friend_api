import { PrismaPetsRepository } from "@/repositories/prisma/pets-prisma-repository";
import { FilterPetsByDetailsService } from "../filterPetsByDetail";

export function makeFilterByQuery() {
  const prismaPetsRepository = new PrismaPetsRepository();
  const service = new FilterPetsByDetailsService(prismaPetsRepository);

  return service;
}
