import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FilterPetsByDetailsService } from "./filterPetsByDetailService";
import { randomUUID } from "crypto";

describe("Filter Pets By Details", () => {
  let inMemoryPetsRepository: InMemoryPetsRepository;
  let sut: FilterPetsByDetailsService;

  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository();
    sut = new FilterPetsByDetailsService(inMemoryPetsRepository);
  });

  it("Should be able to filter pets by query", async () => {
    await inMemoryPetsRepository.create({
      id: randomUUID(),
      name: "hog hog",
      description: "love butterflys",
      fv_food: "hot-dog",
      weight: 100,
      birth: new Date("10-12-2000"),
    });
    await inMemoryPetsRepository.create({
      id: randomUUID(),
      name: "zoiudo",
      description: "love cats",
      fv_food: "hot-dog",
      weight: 100,
      birth: new Date("10-12-2000"),
    });
    await inMemoryPetsRepository.create({
      id: randomUUID(),
      name: "zoiudo",
      description: "love knifes",
      fv_food: "hot-dog",
      weight: 100,
      birth: new Date("10-12-2000"),
    });

    const { pets } = await sut.execute({
      query: "love",
    });

    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ description: "love knifes" }),
        expect.objectContaining({ description: "love cats" }),
      ]),
    );
  });
});
