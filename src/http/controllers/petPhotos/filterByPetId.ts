import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeFilterPetPhotoByPetId } from "@/services/factories/make-filter-pet-photo-by-pet-id-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function filterByPetId(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const filterByPetIdRequestSchema = z.object({
    petId: z.string().uuid(),
  });

  const { petId } = filterByPetIdRequestSchema.parse(request.params);

  try {
    const service = makeFilterPetPhotoByPetId();

    const { petPhotos } = await service.execute({ petId });

    return response.status(200).send({ petPhotos });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return response.status(404).send({ message: error.message });
    }
    throw error;
  }
}
