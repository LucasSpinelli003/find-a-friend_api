import { Prisma } from "@prisma/client";
import { OrganizationRepository } from "../organizations-repository";
import { prisma } from "@/lib/prisma";

export class OrganizationPrismaRepository implements OrganizationRepository {
  async filterByLogin(login: string) {
    const organizations = await prisma.organization.findFirst({
      where: {
        login,
      },
    });

    return organizations;
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({
      data,
    });

    return organization;
  }

  async filerByCity(city: string) {
    const organizations = await prisma.organization.findMany({
      where: {
        city,
      },
    });
    return organizations;
  }
}
