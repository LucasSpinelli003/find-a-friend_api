import { OrganizationRepository } from "@/repositories/organizations-repository";
import { Organization } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FilterOrganizationByIdServiceRequest {
  organizationId: string;
}

interface FilterOrganizationByIdServiceResponse {
  organization: Organization | null;
}

export class FilterOrganizationByIdService {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({
    organizationId,
  }: FilterOrganizationByIdServiceRequest): Promise<FilterOrganizationByIdServiceResponse> {
    const organization =
      await this.organizationRepository.findById(organizationId);

    if (!organization) {
      throw new ResourceNotFoundError();
    }
    return { organization };
  }
}
