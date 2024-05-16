import { beforeEach, describe, it } from "vitest";
import { FilterPetsByCityService } from "./filterPetsByCity";
import { InMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organizations-repository";

describe("Filter by City test", () => {
    const inMemoryOrganizationRepository: InMemoryOrganizationRepository;
    const sut: FilterPetsByCityService;
  beforeEach(() => {
    inMemoryOrganizationRepository = new InMemoryOrganizationRepository()
    sut = new FilterPetsByCityService(inMemoryOrganizationRepository)
  });

  it("should be able to list organizations by city", async () => {
    const organitazions = 
  });
});




