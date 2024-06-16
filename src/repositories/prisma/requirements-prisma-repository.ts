import { prisma } from "@/lib/prisma";
import { RequirementsRepository } from "../requirements-repository";
import { Requirements } from "@prisma/client";

export class RequirementsPrismaRepository implements RequirementsRepository {
  async listAll(page: number) {
    const requirements = await prisma.requirements.findMany({
      skip: page - 1,
      take: 10,
    });

    return requirements;
  }

  async listByPetId(petId: string) {
    const requirements = await prisma.requirements.findMany({
      where: {
        petId,
      },
    });

    return requirements;
  }

  async create(data: Requirements) {
    const requirement = await prisma.requirements.create({ data });
    return requirement;
  }
}
