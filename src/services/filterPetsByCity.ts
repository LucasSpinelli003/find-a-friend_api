import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { PetsRepository } from "@/repositories/pets-repository";

interface FilterPetsByCityRequest {
  city: string;
}

interface FilterPetsByResponse {
  pets: Pet[];
}

export class FilterPetsByCityService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: FilterPetsByCityRequest): Promise<FilterPetsByResponse> {
    const pets = await this.petsRepository.filterByCity(city);

    if (!pets) {
      throw new ResourceNotFoundError();
    }

    return {
      pets,
    };
  }
}
