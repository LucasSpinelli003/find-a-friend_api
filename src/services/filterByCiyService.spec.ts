import { beforeEach, describe, expect, it } from "vitest";
import { FilterByCityService } from "./filterByCityService";
import { InMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organizations-repository";

describe("Filter By city service tests", () => {
  let inMemoryOrganizationRepository: InMemoryOrganizationRepository;
  let sut: FilterByCityService;
  beforeEach(() => {
    inMemoryOrganizationRepository = new InMemoryOrganizationRepository();
    sut = new FilterByCityService(inMemoryOrganizationRepository);
  });

  it("should be able to filter organizations by city", async () => {
    await inMemoryOrganizationRepository.create({
      name: "test-sp",
      city: "São Paulo",
      localization: "teste",
      phone: "13213312",
      description: "1231dsadsadsa",
      login: "test",
      password: "sadasda",
    });

    await inMemoryOrganizationRepository.create({
      name: "test",
      city: "Rio de Janeiro",
      localization: "teste",
      phone: "13213312",
      description: "1231dsadsadsa",
      login: "test",
      password: "sadasda",
    });

    const { organizations } = await sut.execute({
      city: "São Paulo",
    });

    expect(organizations).toEqual([
      expect.objectContaining({ name: "test-sp" }),
    ]);
  });
});
