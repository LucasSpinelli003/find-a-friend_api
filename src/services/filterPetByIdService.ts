import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FilterPetByIdRequest {
  petId: string;
}

interface FilterPetByIdResponse {
  pet: Pet;
}

export class FilterPetByIdService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: FilterPetByIdRequest): Promise<FilterPetByIdResponse> {
    const pet = await this.petsRepository.filterById(petId);

    if (!pet) {
      throw new ResourceNotFoundError();
    }
    return { pet };
  }
}
