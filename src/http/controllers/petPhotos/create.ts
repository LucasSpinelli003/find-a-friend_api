import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeCreatePetPhotoService } from "@/services/factories/make-create-pet-photo-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, response: FastifyReply) {
  const createPetPhotosRequestParamSchema = z.object({
    petId: z.string().uuid(),
  });

  const createPetPhotosRequestBodySchema = z.object({
    convertedPhoto: z.string(),
  });

  const { petId } = createPetPhotosRequestParamSchema.parse(request.params);

  const { convertedPhoto } = createPetPhotosRequestBodySchema.parse(
    request.body,
  );

  try {
    const service = makeCreatePetPhotoService();

    const petPhoto = await service.execute({
      petId,
      convertedPhoto,
    });
    return response.status(201).send(petPhoto);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return response.status(404).send({ message: error.message });
    }
    throw error;
  }
}
