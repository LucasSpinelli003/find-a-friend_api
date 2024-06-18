import { InMemoryRequirementRepository } from "@/repositories/in-memory/in-memory-requirements-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateRequirementService } from "./createRequirementService";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { randomUUID } from "crypto";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

describe("", () => {
  let inMemoryRequirementRepository: InMemoryRequirementRepository;
  let inMemoryPetRepository: InMemoryPetsRepository;
  let createRequirementService: CreateRequirementService;
  beforeEach(() => {
    inMemoryRequirementRepository = new InMemoryRequirementRepository();
    inMemoryPetRepository = new InMemoryPetsRepository();
    createRequirementService = new CreateRequirementService(
      inMemoryRequirementRepository,
      inMemoryPetRepository,
    );
  });

  it("should be able to create a new Requirement", async () => {
    const pet = await inMemoryPetRepository.create({
      id: randomUUID(),
      name: "",
      description: "",
      fv_food: "",
      weight: 200,
    });
    const { requirement } = await createRequirementService.execute({
      name: "espaço grande",
      petId: pet.id,
    });
    expect(requirement).toEqual(
      expect.objectContaining({ name: "espaço grande" }),
    );
  });
  it("should not be able to create a requirement with a fake pet id", async () => {
    expect(async () => {
      await createRequirementService.execute({
        name: "fake-name",
        petId: "fake-id",
      });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
