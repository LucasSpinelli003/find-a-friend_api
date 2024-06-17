import { RequirementsRepository } from "@/repositories/requirements-repository";
import { Requirement } from "@prisma/client";

interface CreateRequirementServiceRequest {
  name: string;
  petId: string;
}

interface CreateRequirementServiceResponse {
  requirement: Requirement;
}

export class CreateRequirementService {
  constructor(private requirementRepository: RequirementsRepository) {}

  async execute({
    name,
    petId,
  }: CreateRequirementServiceRequest): Promise<CreateRequirementServiceResponse> {
    const requirement = await this.requirementRepository.create({
      name,
      petId,
    });

    return { requirement };
  }
}
