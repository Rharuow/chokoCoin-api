import { Request, Response } from "express";
import { RegistrateUserService } from "../../services/User/RegistrateUserService";

export class RegistrateUserController {
  async handle(req: Request, res: Response) {
    const { email, token } = req.body;

    const registrateUserService = new RegistrateUserService();

    try {
      const user = await registrateUserService.execute({
        email,
        token,
      });

      return res.json(user);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}
