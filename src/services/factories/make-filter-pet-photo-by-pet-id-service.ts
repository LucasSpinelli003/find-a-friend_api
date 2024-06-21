import { PetPhotosPrismaRepository } from "@/repositories/prisma/pet-photos-prisma-repository";
import { FilterPetPhotosByPetIdService } from "../filterPetPhotosByPetIdService";

export function makeFilterPetPhotoByPetId() {
  const prisma = new PetPhotosPrismaRepository();
  const service = new FilterPetPhotosByPetIdService(prisma);

  return service;
}
