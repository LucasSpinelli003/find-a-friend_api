import { beforeEach, describe, expect, it } from "vitest";
import { FilterRequirementByPetIdService } from "./filterRequirementByPetIdService";
import { InMemoryRequirementRepository } from "@/repositories/in-memory/in-memory-requirements-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";

describe("", () => {
  let sut: FilterRequirementByPetIdService;
  let inMemoryRepository: InMemoryRequirementRepository;
  beforeEach(() => {
    inMemoryRepository = new InMemoryRequirementRepository();

    sut = new FilterRequirementByPetIdService(inMemoryRepository);
  });

  it("shoud be able to list requirements by pet id", async () => {
    const petsRepository = new InMemoryPetsRepository();
    const pet = await petsRepository.create({
      fv_food: "",
      description: "",
      name: "",
      weight: 200,
    });

    await inMemoryRepository.create({ name: "teste1", petId: pet.id });
    await inMemoryRepository.create({ name: "teste2", petId: pet.id });

    const { requirements } = await sut.execute({ petId: pet.id });

    console.log(requirements);
    expect(requirements).toHaveLength(2);
    expect(requirements).toEqual([
      expect.objectContaining({ name: "teste1" }),
      expect.objectContaining({ name: "teste2" }),
    ]);
  });
});
