import { PetPhotos, Prisma } from "@prisma/client";

export interface PetPhotosRepository {
  create(data: Prisma.PetPhotosUncheckedCreateInput): Promise<PetPhotos>;
  listByPetId(petId: string): Promise<PetPhotos[] | null>;
}
