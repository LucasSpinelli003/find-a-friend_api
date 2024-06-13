import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { MakeFilterOrganizationByIdService } from "@/services/factories/make-filter-organization-by-id-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function filterOrganizationId(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const filterOrganizationByIdSchema = z.object({
    organizationId: z.string(),
  });

  const { organizationId } = filterOrganizationByIdSchema.parse(request.params);

  try {
    const service = MakeFilterOrganizationByIdService();
    const organization = await service.execute({ organizationId });

    return response.status(200).send(organization);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return response.status(404).send({ message: error.message });
    }
    throw error;
  }
}
