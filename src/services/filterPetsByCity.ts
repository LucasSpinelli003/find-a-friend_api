import { OrganizationRepository } from "@/repositories/organizations-repository";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FilterPetsByCityRequest {
  city: string;
}

interface FilterPetsByResponse {
  pets: Pet[];
}

export class FilterPetsByCityService {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({
    city,
  }: FilterPetsByCityRequest): Promise<FilterPetsByResponse> {
    const organitazions = await this.organizationRepository.filerByCity(city);

    console.log("--->", organitazions);

    if (!organitazions) {
      throw new ResourceNotFoundError();
    }

    return {
      organitazions,
    };
  }
}
