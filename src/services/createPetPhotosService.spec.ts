import { beforeEach, describe, expect, it } from "vitest";
import { CreatePetPhotosService } from "./createPetPhotosService";
import { InMemoryPetPhotosRepository } from "@/repositories/in-memory/in-memory-pet-photos-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";

describe("Create pet photos service tests", () => {
  let sut: CreatePetPhotosService;
  let inMemoryPetPhotosRepository: InMemoryPetPhotosRepository;
  let inMemoryPetsRepository: InMemoryPetsRepository;
  beforeEach(() => {
    inMemoryPetPhotosRepository = new InMemoryPetPhotosRepository();
    inMemoryPetsRepository = new InMemoryPetsRepository();
    sut = new CreatePetPhotosService(
      inMemoryPetPhotosRepository,
      inMemoryPetsRepository,
    );
  });

  it("should be able to create a new pet photo", async () => {
    const pet = await inMemoryPetsRepository.create({
      description: "",
      fv_food: "",
      name: "",
      weight: 200,
    });

    const { petPhoto } = await sut.execute({
      convertedPhoto: "teste0",
      petId: pet.id,
    });

    expect(petPhoto).toEqual(
      expect.objectContaining({ convertedPhoto: "teste0" }),
    );
  });
});
