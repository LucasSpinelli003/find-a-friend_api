import { Requirements } from "@prisma/client";
import { RequirementsRepository } from "../requirements-repository";
import { randomUUID } from "node:crypto";

export class InMemoryRepository implements RequirementsRepository {
  private requirements: Requirements[] = [];

  async listByPetId(petId: string) {
    const requirement = await this.requirements.filter((require) => {
      return require.petId === petId;
    });

    return requirement;
  }

  async listAll(page: number) {
    const requirements = await this.requirements.slice(
      (page - 1) * 10,
      page * 10,
    );
    return requirements;
  }

  async create(data: Requirements) {
    const requirement = {
      id: randomUUID(),
      name: data.name,
      petId: data.petId,
    };
    await this.requirements.push(requirement);
    return requirement;
  }
}
