import { Requirements } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { RequirementsRepository } from "@/repositories/requirements-repository";

interface FilterRequirementByPetIdServiceRequest {
  petId: string;
}

interface FilterRequirementByPetIdServiceResponse {
  requirements: Requirements[];
}

export class FilterRequirementByPetIdService {
  constructor(private filterRequirementReposiory: RequirementsRepository) {}

  async execute({
    petId,
  }: FilterRequirementByPetIdServiceRequest): Promise<FilterRequirementByPetIdServiceResponse> {
    const requirements =
      await this.filterRequirementReposiory.listByPetId(petId);

    if (!requirements) {
      throw new ResourceNotFoundError();
    }
    return { requirements };
  }
}
