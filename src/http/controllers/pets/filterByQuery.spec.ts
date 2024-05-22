import { app } from "@/app";
import { createAndAuthenticateOrganization } from "@/services/utils/createAndAuthenticateOrganization";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";

describe("Filter By Query tests E2E", () => {
  beforeEach(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it("should be able to filter by query", async () => {
    const token = await createAndAuthenticateOrganization(app);

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "little doug",
        description: "just a solitaire dog",
        favoriteFood: "lasgna",
        weight: 100,
        birth: new Date("2003-10-12"),
      });
    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "little cat",
        description: "just a solitaire dog",
        favoriteFood: "lasgna",
        weight: 100,
        birth: new Date("2003-10-12"),
      });

    const response = await request(app.server)
      .get("/pets/search")
      .set("Authorization", `Bearer ${token}`)
      .query({
        query: "cat",
      });

    const { pets } = response.body;

    expect(pets).toEqual([expect.objectContaining({ name: "little cat" })]);
  });
});
