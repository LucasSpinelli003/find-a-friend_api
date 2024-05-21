import { Organization, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { OrganizationRepository } from "../organizations-repository";

export class InMemoryOrganizationRepository implements OrganizationRepository {
  public organizations: Organization[] = [];

  async filterByLogin(login: string) {
    const organization = await this.organizations.find((organization) => {
      return organization.login === login;
    });

    if (!organization) {
      return null;
    }

    return organization;
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization: Organization = {
      id: randomUUID(),
      name: data.name,
      description: data.description ? data.description : null,
      city: data.city,
      login: data.login ? data.login : null,
      password: data.password ? data.password : null,
      createdAt: new Date(),
      localization: data.localization,
      phone: data.phone,
    };
    await this.organizations.push(organization);

    return organization;
  }

  async filerByCity(city: string) {
    const organizations = await this.organizations.filter((organization) => {
      return organization.city.includes(city);
    });

    if (!organizations) {
      return null;
    }

    return organizations;
  }
}
