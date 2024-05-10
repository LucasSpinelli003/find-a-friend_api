import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeFilterByQueryService } from "@/services/factories/make-filter-by-query-service";
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
    const service = makeFilterByQueryService();

    const { pets } = await service.execute({ query });

    return response.status(200).send({ pets });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return response.status(404).send({ message: error.message });
    }
    throw error;
  }
}
