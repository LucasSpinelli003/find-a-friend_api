import { app } from "@/app";
import { describe, it, afterEach, beforeEach, expect } from "vitest";
import request from "supertest";

describe("Filter organization by id E2E", () => {
  beforeEach(async () => {
    await app.ready();
  });
  afterEach(async () => {
    await app.close();
  });

  it("should be able to filter organization by id", async () => {
    const organizationCreated = await request(app.server)
      .post("/organizations")
      .send({
        name: "test",
        city: "test",
        description: "test",
        login: "test",
        localization: "test",
        unHashedPassword: "password",
        phone: "1131231",
      });
    const organization = organizationCreated.body;

    const response = await request(app.server)
      .get(`/organizations/${organization.id}`)
      .send();

    expect(response.body.organization).toEqual(
      expect.objectContaining({
        name: "test",
        city: "test",
      }),
    );
  });
});
