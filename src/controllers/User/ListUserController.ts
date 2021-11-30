import { Request, Response } from "express";
import { ListUserService } from "../../services/User/ListUserService";

export class ListUserController {
  async handle(req: Request, res: Response) {
    const listUserService = new ListUserService();

    const users = await listUserService.execute();

    return users.length > 0
      ? res.json(users)
      : res.json({ message: "There isn't user registred" });
  }
}
