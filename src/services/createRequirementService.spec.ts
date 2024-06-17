import { InMemoryRequirementRepository } from "@/repositories/in-memory/in-memory-requirements-repository";
import { beforeEach, describe, it } from "vitest";
import { CreateRequirementService } from "./createRequirementService";

describe("", () => {
  let inMemoryRequirementRepository: InMemoryRequirementRepository;
  let createRequirementService: CreateRequirementService;
  beforeEach(() => {
    inMemoryRequirementRepository = new InMemoryRequirementRepository();
    createRequirementService = new CreateRequirementService(
      inMemoryRequirementRepository,
    );
  });

  it("should be able to create a new Requirement", async () => {
    const requirement = await createRequirementService.execute({
        
    })
  });
});
