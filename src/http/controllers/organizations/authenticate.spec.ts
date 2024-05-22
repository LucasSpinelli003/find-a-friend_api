import { app } from "@/app";
import { describe, it, afterEach, beforeEach, expect } from "vitest";
import request from "supertest";

describe("Authenticate Organization test E2E", () => {
  beforeEach(async () => {
    await app.ready();
  });
  afterEach(async () => {
    await app.close();
  });

  it("should be able to authenticate", async () => {
    await request(app.server).post("/organizations").send({
      name: "test",
      city: "test",
      description: "test",
      login: "test",
      localization: "test",
      unHashedPassword: "password",
      phone: "1131231",
    });

    const response = await request(app.server).post("/authenticate").send({
      login: "test",
      password: "password",
    });

    const { token } = response.body;

    expect(response.statusCode).toEqual(200);
    expect(token).toEqual(expect.any(String));
  });
});
