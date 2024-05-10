import { Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
  async filterByDetail(query: string) {
    const pets = await prisma.pet.findMany({
      where: {
        OR: [{ name: query }, { description: query }, { fv_food: query }],
      },
    });

    if (!pets) {
      return null;
    }

    return pets;
  }

  async create(data: Prisma.PetCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }
}
