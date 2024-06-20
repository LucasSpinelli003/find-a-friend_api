import { PetPhoto } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { PetPhotosRepository } from "@/repositories/pet-photos-repository";

interface FilterPetPhotosByPetIdServiceRequest {
  petId: string;
}

interface FilterPetPhotosByPetIdServiceResponse {
  petPhotos: PetPhoto[];
}

export class FilterPetPhotosByPetIdService {
  constructor(private petPhotosRepository: PetPhotosRepository) {}

  async execute({
    petId,
  }: FilterPetPhotosByPetIdServiceRequest): Promise<FilterPetPhotosByPetIdServiceResponse> {
    const petPhotos = await this.petPhotosRepository.listByPetId(petId);

    if (!petPhotos) {
      throw new ResourceNotFoundError();
    }

    return { petPhotos };
  }
}
