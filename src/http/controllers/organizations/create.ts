import { makeCreateOrganizationService } from "@/services/factories/make-create-organization-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, response: FastifyReply) {
  const createOrganizationSchema = z.object({
    name: z.string(),
    login: z.string(),
    unHashedPassword: z.string(),
    description: z.string(),
    phone: z.string(),
    localization: z.string(),
    city: z.string(),
  });

  const {
    city,
    description,
    localization,
    login,
    name,
    phone,
    unHashedPassword,
  } = createOrganizationSchema.parse(request.body);

  const service = makeCreateOrganizationService();

  const { organization } = await service.execute({
    name,
    city,
    description,
    localization,
    login,
    phone,
    unHashedPassword,
  });

  return response.status(201).send(organization);
}
