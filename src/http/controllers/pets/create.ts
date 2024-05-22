import { makeCreatePetService } from "@/services/factories/make-create-pet-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, response: FastifyReply) {
  const createPetSchema = z.object({
    name: z.string(),
    description: z.string(),
    weight: z.coerce.number(),
    favoriteFood: z.string(),
    birth: z.coerce.date(),
  });

  const { name, description, weight, birth, favoriteFood } =
    createPetSchema.parse(request.body);

  const service = makeCreatePetService();

  const { pet } = await service.execute({
    name,
    description,
    birth,
    favoriteFood,
    weight,
    organizationId: request.user.sub,
  });

  return response.status(201).send({ pet });
}
