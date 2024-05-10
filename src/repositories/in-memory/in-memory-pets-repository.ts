import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { randomUUID } from "crypto";

export class InMemoryPetsRepository implements PetsRepository {
  private pets: Pet[] = [];

  async create(data: Prisma.PetCreateInput) {
    const pet: Pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      birth: data.birth ? new Date(data.birth) : null,
      weight: data.weight,
      fv_food: data.fv_food,
    };
    await this.pets.push(pet);

    return pet;
  }
}
