import { OrganizationRepository } from "@/repositories/organizations-repository";
import { Organization } from "@prisma/client";
import { hash } from "bcryptjs";

interface CreateOrganizationRequestRequest {
  name: string;
  login: string;
  unHashedPassword: string;
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
    unHashedPassword,
    city,
    localization,
    phone,
  }: CreateOrganizationRequestRequest): Promise<CreateOrganizationRequestResponse> {
    const passwordHashed = await hash(unHashedPassword, 6);

    const organization = await this.organizationRepository.create({
      name,
      city,
      localization,
      phone,
      description,
      login,
      password: passwordHashed,
    });

    return {
      organization,
    };
  }
}
