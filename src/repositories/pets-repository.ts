import { Prisma, Pet } from "@prisma/client";

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  filterByDetail(query: string): Promise<Pet[] | null>;
  filterById(petId: string): Promise<Pet | null>;
  filterByCity(city: string): Promise<Pet[] | null>;
}
