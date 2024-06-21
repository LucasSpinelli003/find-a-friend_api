import { app } from "@/app";
import { createAndAuthenticateOrganization } from "@/services/utils/createAndAuthenticateOrganization";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";

describe("Create pet photo test E2E0", () => {
  beforeEach(async () => {
    await app.ready();
  });
  afterEach(async () => {
    await app.close();
  });

  it("should be able to filter a pet photo by pet id", async () => {
    const token = await createAndAuthenticateOrganization(app);

    const petResponse = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "little doug",
        description: "just a solitaire dog",
        favoriteFood: "lasgna",
        weight: 100,
        birth: new Date("2003-10-12"),
      });
    const { pet } = petResponse.body;

    for (let i = 1; i < 4; i++) {
      await request(app.server).post(`/pet/${pet.id}/photos`).send({
        convertedPhoto: "teste3",
      });
    }

    const response = await request(app.server)
      .get(`/pet/${pet.id}/photos`)
      .send();

    const { petPhotos } = response.body;

    expect(petPhotos).toHaveLength(3);
  });
});
