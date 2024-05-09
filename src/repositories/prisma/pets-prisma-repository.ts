import { Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
  constructor() {}
  async create(data: Prisma.PetCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }
}
