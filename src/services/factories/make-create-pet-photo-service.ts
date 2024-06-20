import { PetPhotosPrismaRepository } from "@/repositories/prisma/pet-photos-prisma-repository";
import { CreatePetPhotosService } from "../createPetPhotosService";
import { PrismaPetsRepository } from "@/repositories/prisma/pets-prisma-repository";

export function makeCreatePetPhotoService() {
  const prismaPetPhotosRepository = new PetPhotosPrismaRepository();
  const petRepository = new PrismaPetsRepository();
  const createPetPhotosService = new CreatePetPhotosService(
    prismaPetPhotosRepository,
    petRepository,
  );

  return createPetPhotosService;
}
