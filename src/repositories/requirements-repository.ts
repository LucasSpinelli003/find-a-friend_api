import { Prisma, Requirement } from "@prisma/client";

export interface RequirementsRepository {
  create(data: Prisma.RequirementUncheckedCreateInput): Promise<Requirement>;
  listAll(page: number): Promise<Requirement[]>;
  listByPetId(petId: string): Promise<Requirement[] | null>;
}
