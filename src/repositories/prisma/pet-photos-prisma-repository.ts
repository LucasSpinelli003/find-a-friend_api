import { Prisma } from "@prisma/client";
import { PetPhotosRepository } from "../pet-photos-repository";
import { prisma } from "@/lib/prisma";

export class PetPhotosPrismaRepository implements PetPhotosRepository {
  async create(data: Prisma.PetPhotoUncheckedCreateInput) {
    const petPhotos = await prisma.petPhoto.create({ data });
    return petPhotos;
  }

  async listByPetId(petId: string) {
    const petPhotos = await prisma.petPhoto.findMany({
      where: {
        petId,
      },
    });
    if (!petPhotos) {
      return null;
    }
    return petPhotos;
  }
}
