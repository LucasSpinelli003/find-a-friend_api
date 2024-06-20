import { prisma } from "@/lib/prisma";
import { RequirementsRepository } from "../requirements-repository";
import { Requirement } from "@prisma/client";

export class RequirementsPrismaRepository implements RequirementsRepository {
  async listAll(page: number) {
    const requirements = await prisma.requirement.findMany({
      skip: page - 1,
      take: 10,
    });

    return requirements;
  }

  async listByPetId(petId: string) {
    const requirements = await prisma.requirement.findMany({
      where: {
        petId,
      },
    });

    return requirements;
  }

  async create(data: Requirement) {
    const requirement = await prisma.requirement.create({ data });
    return requirement;
  }
}
