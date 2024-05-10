import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { randomUUID } from "crypto";

export class InMemoryPetsRepository implements PetsRepository {
  private pets: Pet[] = [];

  async filterById(petId: string) {
    const pet = await this.pets.find((pet) => {
      return pet.id === petId;
    });

    if (!pet) {
      return null;
    }
    return pet;
  }

  async filterByDetail(query: string) {
    const pets = await this.pets.filter((pet) => {
      return (
        pet.name.includes(query) ||
        pet.description.includes(query) ||
        pet.fv_food.includes(query)
      );
    });

    if (!pets) {
      return null;
    }

    return pets;
  }

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
