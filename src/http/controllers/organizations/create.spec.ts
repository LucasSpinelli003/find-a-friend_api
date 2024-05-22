import { app } from "@/app";
import { describe, it, afterEach, beforeEach, expect } from "vitest";
import request from "supertest";

describe("Create Organization test E2E", () => {
  beforeEach(async () => {
    await app.ready();
  });
  afterEach(async () => {
    await app.close();
  });

  it("should be able to create a organization", async () => {
    const response = await request(app.server).post("/organizations").send({
      name: "test",
      city: "test",
      description: "test",
      login: "test",
      localization: "test",
      unHashedPassword: "password",
      phone: "1131231",
    });

    const organization = response.body;

    expect(response.statusCode).toEqual(201);
    expect(organization).toEqual(expect.objectContaining({ name: "test" }));
  });
});
