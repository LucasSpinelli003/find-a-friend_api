import { app } from "@/app";
import { createAndAuthenticateOrganization } from "@/services/utils/createAndAuthenticateOrganization";
import { describe, it, afterEach, beforeEach, expect } from "vitest";
import request from "supertest";

describe("Create Pets tests E2E", () => {
  beforeEach(async () => {
    await app.ready();
  });
  afterEach(async () => {
    await app.close();
  });

  it("should be able to create a pet", async () => {
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

    const { pet } = response.body;

    expect(response.statusCode).toEqual(201);
    expect(pet).toEqual(expect.objectContaining({ name: "little doug" }));
  });
});
