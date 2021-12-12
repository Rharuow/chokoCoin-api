import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";
require("dotenv").config();

import { UserRepository } from "../../repositories/UserRepository";
import { sendConfirmationToken } from "../../utils/sendgrid";

interface IUserRequest {
  username: string;
  email: string;
  password: string;
}

export class CreateUserService {
  private generateConfirmationToken(): string {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 28; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async execute({ username, email, password }: IUserRequest) {
    const userRepository = getCustomRepository(UserRepository);

    const userAlreadyExists = await userRepository.findOne({ email });

    if (userAlreadyExists) throw new Error("User already exists");

    const passwordHashed = await hash(
      password,
      parseInt(process.env.HASH_SALTS)
    );

    const isAdmin = email.includes(process.env.ADMIN_MAIL);

    const token = this.generateConfirmationToken();

    const user = userRepository.create({
      username,
      email,
      password: passwordHashed,
      is_admin: isAdmin,
      token,
      is_active: false,
    });

    try {
      await userRepository.save(user);

      await sendConfirmationToken({
        email,
        username,
        id: user.id,
        token,
      });

      return user;
    } catch (error) {
      console.log("Create User Service: ", error.message);
      throw new Error(error.message);
    }
  }
}
