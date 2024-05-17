import { beforeEach, describe, it } from "vitest";
import { FilterPetsByCityService } from "./filterPetsByCity";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";

describe("Filter pets by city", () => {
  let inMemoryPetsRepository: InMemoryPetsRepository;
  let sut: FilterPetsByCityService;

  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository();
    sut = new FilterPetsByCityService(inMemoryPetsRepository);
  });

  it("should be able to filter pets by a city", async () => {
    const pets = await sut.execute();
  });
});
