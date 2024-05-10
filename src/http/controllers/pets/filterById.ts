import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeFilterByIdService } from "@/services/factories/make-filter-by-id-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function filterById(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const filterByIdSchema = z.object({
    petId: z.string(),
  });

  const { petId } = filterByIdSchema.parse(request.params);

  try {
    const service = makeFilterByIdService();

    const { pet } = await service.execute({
      petId,
    });

    return { pet };
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return response.status(404).send({ message: error.message });
    }
  }
}
