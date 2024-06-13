import { InMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organizations-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FilterOrganizationByIdService } from "./filterOrganizationByIdService";

describe("Filter Organization by id", () => {
  let inMemoryRepository: InMemoryOrganizationRepository;
  let sut: FilterOrganizationByIdService;

  beforeEach(() => {
    inMemoryRepository = new InMemoryOrganizationRepository();
    sut = new FilterOrganizationByIdService(inMemoryRepository);
  });

  it("should be able to filter Organization by organizationId", async () => {
    const response = await inMemoryRepository.create({
      city: "",
      localization: "teste",
      name: "",
      phone: "",
    });

    const { organization } = await sut.execute({ organizationId: response.id });
    console.log(organization);
    expect(organization?.localization).toEqual(response.localization);
  });
});
