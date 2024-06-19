import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeFilterByIdRequirement } from "@/services/factories/make-filter-by-id-requirement-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function filterByPetId(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const filterByIdSchema = z.object({
    petId: z.string().uuid(),
  });

  const { petId } = filterByIdSchema.parse(request.params);

  try {
    const service = makeFilterByIdRequirement();
    const { requirements } = await service.execute({ petId });

    return response.status(200).send({ requirements });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return response.status(404).send({ message: error.message });
    }
    throw error;
  }
}
