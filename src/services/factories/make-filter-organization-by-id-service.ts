import { OrganizationPrismaRepository } from "@/repositories/prisma/organization-prisma-repository";
import { FilterOrganizationByIdService } from "../filterOrganizationByIdService";

export function MakeFilterOrganizationByIdService() {
  const organizationRepository = new OrganizationPrismaRepository();
  const service = new FilterOrganizationByIdService(organizationRepository);
  return service;
}
