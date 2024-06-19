import { Prisma, Requirements } from "@prisma/client";

export interface RequirementsRepository {
  create(data: Prisma.RequirementsUncheckedCreateInput): Promise<Requirements>;
  listAll(page: number): Promise<Requirements[]>;
  listByPetId(petId: string): Promise<Requirements[] | null>;
}
