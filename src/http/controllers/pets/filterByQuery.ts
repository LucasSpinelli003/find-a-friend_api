import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeFilterByQuery } from "@/services/factories/make-filter-by-query";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function filterByQuery(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const queryParamSchema = z.object({
    query: z.string(),
  });

  const { query } = queryParamSchema.parse(request.query);

  try {
    const service = makeFilterByQuery();

    const { pets } = await service.execute({ query });

    return response.status(200).send({ pets });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return response.status(404).send({ message: error.message });
    }
    throw error;
  }
}
