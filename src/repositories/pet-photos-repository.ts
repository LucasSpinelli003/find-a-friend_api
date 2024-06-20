import { PetPhoto, Prisma } from "@prisma/client";

export interface PetPhotosRepository {
  create(data: Prisma.PetPhotoUncheckedCreateInput): Promise<PetPhoto>;
  listByPetId(petId: string): Promise<PetPhoto[] | null>;
}
