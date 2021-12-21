import { getCustomRepository } from "typeorm";
import { UserToProjectRepository } from "../../repositories/UserToProjectRepository";

export class ListProjectService {
  async execute() {
    const usersToProjectRepository = getCustomRepository(UserToProjectRepository)

    const usersToProjects = await usersToProjectRepository.findProjectsByPartners();

    return usersToProjects;
  }
}
