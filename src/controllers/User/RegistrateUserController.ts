import { Request, Response } from "express";
import { CreateUserService } from "../../services/User/CreateUserService";

export class RegistrateUserController {
  async handle(req: Request, res: Response) {
    const { username, email, password } = req.body;

    const createUserService = new CreateUserService();

    try {
      const user = await createUserService.execute({
        username,
        email,
        password,
      });

      return res.json(user);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}
