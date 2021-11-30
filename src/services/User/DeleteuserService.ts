import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../repositories/UserRepository";

export class DeleteUserService {
  async execute(id: string) {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.delete({ id: id });
    return user;
  }
}
