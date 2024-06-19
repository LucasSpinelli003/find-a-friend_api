import { Prisma } from "@prisma/client";
import { PetPhotosRepository } from "../pet-photos-repository";
import { prisma } from "@/lib/prisma";

export class PetPhotosPrismaRepository implements PetPhotosRepository {
  async create(data: Prisma.PetPhotosUncheckedCreateInput) {
    const petPhotos = await prisma.petPhotos.create({ data });
    return petPhotos;
  }

  async listByPetId(petId: string) {
    const petPhotos = await prisma.petPhotos.findMany({
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
