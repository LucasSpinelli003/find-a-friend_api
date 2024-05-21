import { OrganizationRepository } from "@/repositories/organizations-repository";
import { Organization } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateOrganizationServiceRequest {
  login: string;
  password: string;
}

interface AuthenticateOrganizationServiceResponse {
  organization: Organization;
}

export class AuthenticateOrganizationService {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({
    login,
    password,
  }: AuthenticateOrganizationServiceRequest): Promise<AuthenticateOrganizationServiceResponse> {
    const organization = await this.organizationRepository.filterByLogin(login);

    if (!organization) {
      throw new ResourceNotFoundError();
    }

    const isPasswordMatch = await compare(
      password,
      organization.password ?? "",
    );

    if (!isPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return { organization };
  }
}
