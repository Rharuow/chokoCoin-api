import { Request, Response } from "express";
import { DeleteProjectService } from "../../services/Project/DeleteProjectService";

export class DeleteProjectController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const token = req.headers.authorization as string;

    const deleteProjectService = new DeleteProjectService();

    try {
      const projects = await deleteProjectService.execute({
        id,
        token,
      });

      return res.json(projects);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}
