import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FilterPetsByDetailsRequest {
  query: string;
}

interface FilterPetsByDetailsResponse {
  pets: Pet[];
}

export class FilterPetsByDetailsService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    query,
  }: FilterPetsByDetailsRequest): Promise<FilterPetsByDetailsResponse> {
    const pets = await this.petsRepository.filterByDetail(query);

    if (!pets) {
      throw new ResourceNotFoundError();
    }
    return { pets };
  }
}
