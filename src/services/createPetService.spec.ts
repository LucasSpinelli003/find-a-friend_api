import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreatePetService } from "./createPetService";
import { InMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organizations-repository";

describe("Create pet service tests", () => {
  let inMemoryPetsRepository: InMemoryPetsRepository;
  let inMemoryOrganizationsRepository: InMemoryOrganizationRepository;
  let sut: CreatePetService;

  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository();
    inMemoryOrganizationsRepository = new InMemoryOrganizationRepository();
    sut = new CreatePetService(inMemoryPetsRepository);
  });

  it("Should be able to create a new pet", async () => {
    const organization = await inMemoryOrganizationsRepository.create({
      city: "asdas",
      localization: "asdada",
      name: "asdad",
      phone: "12313213",
      description: "sadad",
    });

    const { id } = organization;

    const pet = await sut.execute({
      name: "little doug",
      description: "just a solitaire dog",
      favoriteFood: "lasgna",
      weight: 100,
      birth: new Date("2003-10-12"),
      organizationId: id,
    });
    expect(pet.pet).toEqual(
      expect.objectContaining({
        name: "little doug",
      }),
    );
  });
});
