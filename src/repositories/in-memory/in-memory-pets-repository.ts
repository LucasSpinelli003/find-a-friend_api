import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { randomUUID } from "crypto";
import { InMemoryOrganizationRepository } from "./in-memory-organizations-repository";

export class InMemoryPetsRepository implements PetsRepository {
  private pets: Pet[] = [];
  public organizationRepository = new InMemoryOrganizationRepository();

  async filterByCity(city: string) {
    const organizations = await this.organizationRepository.filerByCity(city);

    if (!organizations) {
      return null;
    }
    const pets = await Promise.all(
      organizations?.map(async (organization) => {
        return await this.filterByOrganizationId(organization.id);
      }),
    );

    if (!pets) {
      return null;
    }
    const allPet = pets.flat();

    return allPet;
  }

  async filterByOrganizationId(organizationId: string) {
    const pets = this.pets.filter((pet) => {
      return pet.organizationId === organizationId;
    });

    return pets;
  }

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

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      birth: data.birth ? new Date(data.birth) : null,
      weight: data.weight,
      fv_food: data.fv_food,
      organizationId: data.organizationId ? data.organizationId : null,
    };
    await this.pets.push(pet);

    return pet;
  }
}
