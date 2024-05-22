import { CreateOrganizationService } from "../createOrganizationService";
import { OrganizationPrismaRepository } from "./../../repositories/prisma/organization-prisma-repository";
export function makeCreateOrganizationService() {
  const organizationPrismaRepository = new OrganizationPrismaRepository();
  const service = new CreateOrganizationService(organizationPrismaRepository);

  return service;
}
