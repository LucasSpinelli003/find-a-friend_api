import { Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
  async filterByCity(city: string) {
    const pets = await prisma.pet.findMany({
      where: {
        organization: {
          city,
        },
      },
    });
    if (!pets) {
      return null;
    }

    return pets;
  }

  async filterByDetail(query: string) {
    const pets = await prisma.pet.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { description: { contains: query } },
          { fv_food: { contains: query } },
        ],
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

  async filterById(petId: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id: petId,
      },
    });

    if (!pet) {
      return null;
    }
    return pet;
  }
}
