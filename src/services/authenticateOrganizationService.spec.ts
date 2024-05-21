import { describe, expect, it, beforeEach } from "vitest";
import { AuthenticateOrganizationService } from "./authenticateOrganizationService";
import { InMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organizations-repository";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe("Authenticate Organization Service tests", () => {
  let inMemoryOrganizationRepository: InMemoryOrganizationRepository;
  let sut: AuthenticateOrganizationService;

  beforeEach(() => {
    inMemoryOrganizationRepository = new InMemoryOrganizationRepository();
    sut = new AuthenticateOrganizationService(inMemoryOrganizationRepository);
  });

  it("should be able to authenticate a organization", async () => {
    await inMemoryOrganizationRepository.create({
      name: "name teste",
      login: "teste",
      password: await hash("teste", 6),
      city: "SP",
      localization: "dasdas",
      phone: "1231312",
    });

    const { organization } = await sut.execute({
      login: "teste",
      password: "teste",
    });

    expect(organization).toEqual(
      expect.objectContaining({ name: "name teste" }),
    );
  });

  it("should be able to unvalidate a organization", async () => {
    await inMemoryOrganizationRepository.create({
      name: "name teste",
      login: "teste",
      password: await hash("teste", 6),
      city: "SP",
      localization: "dasdas",
      phone: "1231312",
    });

    expect(async () => {
      await sut.execute({
        login: "teste",
        password: "uncorrectPassword",
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
