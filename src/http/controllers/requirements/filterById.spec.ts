import { app } from "@/app";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createAndAuthenticateOrganization } from "@/services/utils/createAndAuthenticateOrganization";

describe("Filter by pet id tests E2E", () => {
  beforeEach(async () => {
    await app.ready();
  });
  afterEach(async () => {
    await app.close();
  });

  it("should be able to filter requirements by pet id", async () => {
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

    await request(app.server).post(`/requirements`).send({
      name: "teste1",
      petId: pet.id,
    });
    await request(app.server).post(`/requirements`).send({
      name: "teste2",
      petId: pet.id,
    });

    const requirementsResponse = await request(app.server)
      .get(`/requirements/${pet.id}`)
      .send();

    const { requirements } = requirementsResponse.body;
    expect(requirements).toHaveLength(2);
    expect(requirements).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "teste1" }),
        expect.objectContaining({ name: "teste2" }),
      ]),
    );
  });
});
