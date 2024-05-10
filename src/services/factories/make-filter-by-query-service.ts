import { PrismaPetsRepository } from "@/repositories/prisma/pets-prisma-repository";
import { FilterPetsByDetailsService } from "../filterPetsByDetailService";

export function makeFilterByQueryService() {
  const prismaPetsRepository = new PrismaPetsRepository();
  const service = new FilterPetsByDetailsService(prismaPetsRepository);

  return service;
}
