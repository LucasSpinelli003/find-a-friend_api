import { Organization, Prisma } from "@prisma/client";

export interface OrganizationRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>;
  filerByCity(city: string): Promise<Organization[] | null>;
  filterByLogin(login: string): Promise<Organization | null>;
}
