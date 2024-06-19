import { app } from "@/app";
import { describe, beforeEach, afterEach, it, expect } from "vitest";
import request from "supertest";
import { createAndAuthenticateOrganization } from "@/services/utils/createAndAuthenticateOrganization";
import { Pet } from "@prisma/client";
interface PetResponse {
  pet: Pet;
}
describe("Create requirement tests E2E", () => {
  beforeEach(async () => {
    await app.ready();
  });
  afterEach(async () => {
    await app.close();
  });

  it("shoud be able to create a requirement", async () => {
    const token = await createAndAuthenticateOrganization(app);

    const response = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "little doug",
        description: "just a solitaire dog",
        favoriteFood: "lasgna",
        weight: 100,
        birth: new Date("2003-10-12"),
      });

    const { pet }: PetResponse = response.body;

    const responseRequirement = await request(app.server)
      .post("/requirements")
      .send({
        name: "adbbbbbbbsa",
        petId: pet.id,
      });
    const { requirement } = responseRequirement.body;
    expect(requirement).toEqual(
      expect.objectContaining({ name: "adbbbbbbbsa" }),
    );
  });
});
