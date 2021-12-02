import { Request, Response } from "express";
import { GetUserByTokenService } from "../../services/User/GetUserByTokenService";

export class GetUserByTokenController {
  async handle(req: Request, res: Response) {
    const getUserByTokenService = new GetUserByTokenService();

    const token = req.headers.authorization;

    const users = await getUserByTokenService.execute(token);

    return res.json(users);
  }
}
