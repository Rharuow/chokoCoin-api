import { getCustomRepository } from "typeorm";
import jwt from "jsonwebtoken";

import { IUserSession } from "../../middlewares/ensureAuthenticated";
import { UserRepository } from "../../repositories/UserRepository";

export class GetUserByTokenService {
  async execute(token: string) {
    const userRepository = getCustomRepository(UserRepository);

    const { user } = jwt.verify(
      token.split(" ")[1],
      process.env.SECRET
    ) as IUserSession;

    const users = await userRepository.findOneOrFail(user.id);

    return users;
  }
}
