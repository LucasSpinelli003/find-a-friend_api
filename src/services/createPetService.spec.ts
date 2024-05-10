import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreatePetService } from "./createPetService";

describe("Create pet service tests", () => {
  let inMemoryPetsRepository: InMemoryPetsRepository;
  let sut: CreatePetService;

  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository();
    sut = new CreatePetService(inMemoryPetsRepository);
  });

  it("Should be able to create a new pet", async () => {
    const pet = await sut.execute({
      name: "little doug",
      description: "just a solitaire dog",
      favoriteFood: "lasgna",
      weight: 100,
      birth: new Date("2003-10-12"),
    });
    expect(pet.pet).toEqual(
      expect.objectContaining({
        name: "little doug",
      }),
    );
  });
});
