import { Request, Response } from "express";
import { DeleteUserService } from "../../services/User/DeleteuserService";
import { ListUserService } from "../../services/User/ListUserService";

export class DeleteUserController {
  async handle(req: Request, res: Response) {
    const deleteUserService = new DeleteUserService();
    const listUserService = new ListUserService();

    const { authorization } = req.headers;

    const { id } = req.params;

    try {
      await deleteUserService.execute(id);
      const users = await listUserService.execute(authorization);

      return res.json({
        users,
        message: "User has been deleted",
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send(err.message);
    }
  }
}
