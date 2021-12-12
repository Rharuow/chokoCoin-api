import { getCustomRepository } from "typeorm";
require("dotenv").config();

import { UserRepository } from "../../repositories/UserRepository";

interface IUserRequest {
  email: string;
  token: string;
}

export class RegistrateUserService {
  async execute({ email, token }: IUserRequest) {
    const userRepository = getCustomRepository(UserRepository);

    try {
      const user = await userRepository.findOne({ email, token });

      console.log("user = ", user);
      console.log("email and token ", email, token);

      await userRepository.update(
        { email },
        { is_active: true, token: user.id }
      );

      return user;
    } catch (error) {
      console.log("catch > registration => ", error.message);
      throw new Error(error.message);
    }
  }
}
