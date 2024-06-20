import { PetPhoto, Prisma } from "@prisma/client";
import { PetPhotosRepository } from "../pet-photos-repository";
import { randomUUID } from "crypto";

export class InMemoryPetPhotosRepository implements PetPhotosRepository {
  private petPhotos: PetPhoto[] = [];
  async create(data: Prisma.PetPhotoUncheckedCreateInput) {
    const petPhotos = {
      id: randomUUID(),
      convertedPhoto: data.convertedPhoto,
      petId: data.petId,
    };
    await this.petPhotos.push(petPhotos);
    return petPhotos;
  }

  async listByPetId(petId: string) {
    const petPhoto = await this.petPhotos.filter((petPhoto) => {
      return petPhoto.petId === petId;
    });

    if (!petPhoto) {
      return null;
    }
    return petPhoto;
  }
}
