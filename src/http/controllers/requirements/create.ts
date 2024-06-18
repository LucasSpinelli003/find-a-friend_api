import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeCreateRequirementService } from "@/services/factories/make-requirement-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, response: FastifyReply) {
  const createRequirementSchema = z.object({
    name: z.string(),
    petId: z.string().uuid(),
  });

  const { name, petId } = createRequirementSchema.parse(request.body);

  try {
    const service = makeCreateRequirementService();

    const requirement = service.execute({ name, petId });
    return response.status(201).send({ requirement });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return response.status(404).send({ message: error.message });
    }
  }
}
