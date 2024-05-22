import { app } from "@/app";
import { describe, it, afterEach, beforeEach, expect } from "vitest";
import request from "supertest";

describe("Refresh token test E2E", () => {
  beforeEach(async () => {
    await app.ready();
  });
  afterEach(async () => {
    await app.close();
  });

  it("should be able to refresh a token", async () => {
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

    const cookies = response.get("Set-Cookie");

    const refreshTokenResponse = await request(app.server)
      .patch("/token/refresh")
      .set("Cookie", cookies ?? [])
      .send();

    const { token } = refreshTokenResponse.body;
    expect(refreshTokenResponse.statusCode).toEqual(200);
    expect(token).toEqual(expect.any(String));
  });
});
