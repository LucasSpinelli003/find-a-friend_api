import { beforeEach, describe, expect, it } from "vitest";
import { FilterPetPhotosByPetIdService } from "./filterPetPhotosByPetIdService";
import { InMemoryPetPhotosRepository } from "@/repositories/in-memory/in-memory-pet-photos-repository";

describe("Filter pet photos by pet id tests", () => {
  let inMemoryRepository: InMemoryPetPhotosRepository;
  let sut: FilterPetPhotosByPetIdService;

  beforeEach(() => {
    inMemoryRepository = new InMemoryPetPhotosRepository();
    sut = new FilterPetPhotosByPetIdService(inMemoryRepository);
  });

  it("should be able to filter pet photo by pet id", async () => {
    await inMemoryRepository.create({
      convertedPhoto: "fake base64",
      petId: "e61430b3-fd15-4902-8e66-8c58fcaaf7a1",
    });

    const { petPhotos } = await sut.execute({
      petId: "e61430b3-fd15-4902-8e66-8c58fcaaf7a1",
    });

    expect(petPhotos).toEqual([
      expect.objectContaining({ convertedPhoto: "fake base64" }),
    ]);
  });
});
