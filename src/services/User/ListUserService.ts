import { getCustomRepository } from "typeorm";
import { UserToProjectRepository } from "../../repositories/UserToProjectRepository";

export class ListUserService {
  async execute() {
    const userRepository = getCustomRepository(UserToProjectRepository);

    const users = await userRepository.findUsersWithProjects();

    return users;
  }
}
