import { Requirements } from "@prisma/client";

export interface RequirementsRepository {
  create(data: Requirements): Promise<Requirements>;
  listAll(page: number): Promise<Requirements[]>;
  listByPetId(petId: string): Promise<Requirements[] | null>;
}
