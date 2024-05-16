import { Prisma, Pet } from "@prisma/client";

export interface PetsRepository {
  create(data: Prisma.PetCreateInput): Promise<Pet>;
  filterByDetail(query: string): Promise<Pet[] | null>;
  filterById(petId: string): Promise<Pet | null>;
  filterByOrganizationId(organizationId: string): Promise<Pet[] | null>;
}
