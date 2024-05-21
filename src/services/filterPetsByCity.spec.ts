import { beforeEach, describe, expect, it } from "vitest";
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
    const spOrganization =
      await inMemoryPetsRepository.organizationRepository.create({
        name: "adasd",
        city: "São Paulo",
        phone: "12313123",
        localization: "rasdadas asda",
        description: "sdadasd",
      });

    const rjOrganization =
      await inMemoryPetsRepository.organizationRepository.create({
        name: "kkkkkkkkk",
        city: "Rio de Janeiro",
        phone: "111111111111",
        localization: "sddsdasasdadsdas",
        description: "sdaasdasdasdasdasddasd",
      });

    await inMemoryPetsRepository.create({
      organizationId: spOrganization.id,
      name: "doguein",
      fv_food: "roizz",
      weight: 200,
      description: "asdasd",
      birth: new Date(),
    });

    await inMemoryPetsRepository.create({
      organizationId: rjOrganization.id,
      name: "cat",
      fv_food: "roizz",
      weight: 200,
      description: "asdasd",
      birth: new Date(),
    });

    const { pets } = await sut.execute({
      city: "Rio de Janeiro",
    });

    expect(pets).toEqual([expect.objectContaining({ name: "cat" })]);
    // expect(pets.pets.).toEqual(200);
  });
});
