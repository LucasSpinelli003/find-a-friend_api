import { PrismaPetsRepository } from "@/repositories/prisma/pets-prisma-repository";
import { FilterPetByIdService } from "../filterPetByIdService";

export function makeFilterByIdService() {
  const prismaPetsRepository = new PrismaPetsRepository();
  const service = new FilterPetByIdService(prismaPetsRepository);
  return service;
}
