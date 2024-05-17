import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeFilterPetsByCity } from "@/services/factories/make-filter-pets-by-city";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function filterByCity(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const filterByCityRequestSchema = z.object({
    city: z.string(),
  });

  const { city } = filterByCityRequestSchema.parse(request.params);

  try {
    const service = makeFilterPetsByCity();
    const { pets } = await service.execute({ city });

    return response.status(200).send({ pets });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return response.status(404).send({ message: error.message });
    }
    throw error;
  }
}
