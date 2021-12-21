import { getCustomRepository } from "typeorm";
import { UserToProjectRepository } from "../../repositories/UserToProjectRepository";

export class ListUserService {
  async execute(token: string) {
    const userRepository = getCustomRepository(UserToProjectRepository);

    const users = await userRepository.findUsersWithProjects(token);

    return users;
  }
}
