import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { describe, expect, it, beforeEach } from "vitest";
import { FilterPetByIdService } from "./filterPetByIdService";
import { randomUUID } from "node:crypto";

describe("Filter Pet by id", () => {
  let inMemoryPetsRepository: InMemoryPetsRepository;
  let sut: FilterPetByIdService;

  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository();
    sut = new FilterPetByIdService(inMemoryPetsRepository);
  });

  it("should be able to filter a pet by id", async () => {
    const cat = await inMemoryPetsRepository.create({
      id: randomUUID(),
      name: "cat",
      description: "love butterflys",
      fv_food: "hot-dog",
      weight: 100,
      birth: new Date("10-12-2000"),
    });
    await inMemoryPetsRepository.create({
      id: randomUUID(),
      name: "little doug",
      description: "just a solitaire dog",
      fv_food: "lasgna",
      weight: 100,
      birth: new Date("2003-10-12"),
    });

    const { pet } = await sut.execute({
      petId: cat.id,
    });

    expect(pet).toEqual(
      expect.objectContaining({
        name: "cat",
      }),
    );
  });
});
