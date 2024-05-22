import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeAuthenticateOrganizationService } from "@/services/factories/make-authenticate-organization-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const authenticateOrganizationSchema = z.object({
    login: z.string(),
    password: z.string(),
  });

  const { login, password } = authenticateOrganizationSchema.parse(
    request.body,
  );

  try {
    const service = makeAuthenticateOrganizationService();
    const { organization } = await service.execute({ login, password });

    const token = await response.jwtSign({
      sign: {
        sub: organization.id,
      },
    });

    const refreshToken = await

    return response.status(200).send({ organization });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return response.status(404).send({ message: error.message });
    }
    if (error instanceof InvalidCredentialsError) {
      return response.status(401).send({ message: error.message });
    }
    throw error;
  }
}
