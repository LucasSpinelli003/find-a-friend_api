import { RequirementsPrismaRepository } from "@/repositories/prisma/requirements-prisma-repository";
import { CreateRequirementService } from "../createRequirementService";
import { PrismaPetsRepository } from "@/repositories/prisma/pets-prisma-repository";

export function makeCreateRequirementService() {
  const prismaRequirementRepository = new RequirementsPrismaRepository();
  const prismaPetsRepository = new PrismaPetsRepository();
  const service = new CreateRequirementService(
    prismaRequirementRepository,
    prismaPetsRepository,
  );

  return service;
}
