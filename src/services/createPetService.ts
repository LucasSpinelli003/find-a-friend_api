import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface CreatePetRequest {
  name: string;
  description: string;
  birth: Date;
  favoriteFood: string;
  weight: number;
}

interface CreatePetResponse {
  pet: Pet;
}

export class CreatePetService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    birth,
    description,
    favoriteFood,
    weight,
  }: CreatePetRequest): Promise<CreatePetResponse> {
    const pet = await this.petsRepository.create({
      name,
      description,
      weight,
      fv_food: favoriteFood,
      birth,
    });
    return { pet };
  }
}
