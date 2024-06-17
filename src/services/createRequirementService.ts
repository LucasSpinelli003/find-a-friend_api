import { PetsRepository } from "@/repositories/pets-repository";
import { RequirementsRepository } from "@/repositories/requirements-repository";
import { Requirement } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CreateRequirementServiceRequest {
  name: string;
  petId: string;
}

interface CreateRequirementServiceResponse {
  requirement: Requirement;
}

export class CreateRequirementService {
  constructor(
    private requirementRepository: RequirementsRepository,
    private petRepository: PetsRepository,
  ) {}

  async execute({
    name,
    petId,
  }: CreateRequirementServiceRequest): Promise<CreateRequirementServiceResponse> {
    const pet = await this.petRepository.filterById(petId);
    if (!pet) {
      throw new ResourceNotFoundError();
    }
    const requirement = await this.requirementRepository.create({
      name,
      petId,
    });

    return { requirement };
  }
}
