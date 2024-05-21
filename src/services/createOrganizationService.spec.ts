import { InMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organizations-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateOrganizationService } from "./createOrganizationService";

describe("Create Organization Service tests", () => {
  let inMemoryOrganizationRepository: InMemoryOrganizationRepository;
  let createOrganizationService: CreateOrganizationService;

  beforeEach(() => {
    inMemoryOrganizationRepository = new InMemoryOrganizationRepository();
    createOrganizationService = new CreateOrganizationService(
      inMemoryOrganizationRepository,
    );
  });

  it("should be able to create a organization", async () => {
    const { organization } = await createOrganizationService.execute({
      name: "asdad",
      city: "sadasdasda",
      description: "adasda",
      login: "asdadas",
      localization: "asdas",
      password: "asdad",
      phone: "1131231",
    });

    expect(organization).toEqual(expect.objectContaining({ name: "asdad" }));
  });
});
