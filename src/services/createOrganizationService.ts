import { OrganizationRepository } from "@/repositories/organizations-repository";
import { Organization } from "@prisma/client";

interface CreateOrganizationRequestRequest {
  name: string;
  login: string;
  password: string;
  description: string;
  phone: string;
  localization: string;
  city: string;
}

interface CreateOrganizationRequestResponse {
  organization: Organization;
}

export class CreateOrganizationService {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({
    name,
    description,
    login,
    password,
    city,
    localization,
    phone,
  }: CreateOrganizationRequestRequest): Promise<CreateOrganizationRequestResponse> {
    const organization = await this.organizationRepository.create({
      name,
      city,
      localization,
      phone,
      description,
      login,
      password,
    });

    return {
      organization,
    };
  }
}
