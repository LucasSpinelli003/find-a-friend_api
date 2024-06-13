import { Organization, Prisma } from "@prisma/client";

export interface OrganizationRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>;
  findById(organizationId: string): Promise<Organization | null>;
  filerByCity(city: string): Promise<Organization[] | null>;
  filterByLogin(login: string): Promise<Organization | null>;
}
