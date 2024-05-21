import { OrganizationRepository } from "@/repositories/organizations-repository";
import { Organization } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FilterByCityRequest {
  city: string;
}

interface FilterByCityResponse {
  organizations: Organization[];
}

export class FilterByCityService {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({ city }: FilterByCityRequest): Promise<FilterByCityResponse> {
    const organizations = await this.organizationRepository.filerByCity(city);

    if (!organizations) {
      throw new ResourceNotFoundError();
    }

    return { organizations };
  }
}
