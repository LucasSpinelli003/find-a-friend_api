import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJwt(
  request: FastifyRequest,
  response: FastifyReply,
) {
  try {
    await request.jwtVerify();
  } catch (error) {
    throw response.status(401).send({ message: "Unauthorized." });
  }
}
