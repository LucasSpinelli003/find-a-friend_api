import { app } from "@/app";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createAndAuthenticateOrganization } from "@/services/utils/createAndAuthenticateOrganization";

describe("Filter By Id tests E2E", () => {
  beforeEach(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it("should be able to filter by pet id", async () => {
    const token = await createAndAuthenticateOrganization(app);

    const petCreateResponse = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "little doug",
        description: "just a solitaire dog",
        favoriteFood: "lasgna",
        weight: 100,
        birth: new Date("2003-10-12"),
      });

    const { pet } = petCreateResponse.body;

    const response = await request(app.server)
      .get(`/pets/${pet.id}`)
      .set("Authorization", `Bearer ${token}`);

    const expectPet = response.body.pet;
    expect(expectPet).toEqual(expect.objectContaining({ name: "little doug" }));
  });
});
