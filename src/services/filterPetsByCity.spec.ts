import { beforeEach, describe, expect, it } from "vitest";
import { FilterPetsByCityService } from "./filterPetsByCity";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { InMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organizations-repository";

describe("Filter pets by city", () => {
  // let inMemoryPetsRepository: InMemoryPetsRepository;
  // let inMemoryOrganizationsRepository: InMemoryOrganizationRepository;
  // let sut: FilterPetsByCityService;

  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository();
    inMemoryOrganizationsRepository = new InMemoryOrganizationRepository();
    sut = new FilterPetsByCityService(inMemoryPetsRepository);
  });

  it.skip("should be able to filter pets by a city", async () => {
    const organization = await inMemoryOrganizationsRepository.create({
      city: "São Paulo",
      localization: "Rua carijos 1231",
      name: "BLack hole",
      phone: "12313",
      description: "adadasd",
    });

    const { id } = organization;

    const pet = inMemoryPetsRepository.create({
      organizationId: id,
      name: "foguit",
      fv_food: "gire",
      description: "im a fireball",
      weight: 200,
      birth: new Date(),
    });

    const pets = await sut.execute({ city: "São Paulo" });

    console.log(organization);
    console.log(pet);

    expect(pets.pets).toEqual([expect.objectContaining({ name: "foguit" })]);
  });
});
