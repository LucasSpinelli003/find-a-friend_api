import { RequirementsPrismaRepository } from "@/repositories/prisma/requirements-prisma-repository";
import { FilterRequirementByPetIdService } from "../filterRequirementByPetIdService";

export function makeFilterByIdRequirement() {
  const requirementRepository = new RequirementsPrismaRepository();
  const service = new FilterRequirementByPetIdService(requirementRepository);

  return service;
}
