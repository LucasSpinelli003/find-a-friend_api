import { PrismaPetsRepository } from "@/repositories/prisma/pets-prisma-repository";
import { CreatePetService } from "../create-pet-service";

export function makeCreatePetService() {
  const petRepository = new PrismaPetsRepository();
  const service = new CreatePetService(petRepository);

  return service;
}
