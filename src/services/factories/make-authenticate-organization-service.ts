import { AuthenticateOrganizationService } from "../authenticateOrganizationService";
import { OrganizationPrismaRepository } from "./../../repositories/prisma/organization-prisma-repository";
export function makeAuthenticateOrganizationService() {
  const organizationPrismaRepository = new OrganizationPrismaRepository();
  const service = new AuthenticateOrganizationService(
    organizationPrismaRepository,
  );

  return service;
}
