import { PetPhotosRepository } from "@/repositories/pet-photos-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { PetPhoto } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CreatePetPhotosServiceRequest {
  petId: string;
  convertedPhoto: string;
}

interface CreatePetPhotosServiceResponse {
  petPhoto: PetPhoto;
}

export class CreatePetPhotosService {
  constructor(
    private petPhotosRepository: PetPhotosRepository,
    private petRepository: PetsRepository,
  ) {}

  async execute({
    petId,
    convertedPhoto,
  }: CreatePetPhotosServiceRequest): Promise<CreatePetPhotosServiceResponse> {
    const pet = await this.petRepository.filterById(petId);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    const petPhoto = await this.petPhotosRepository.create({
      petId,
      convertedPhoto,
    });

    return { petPhoto };
  }
}
