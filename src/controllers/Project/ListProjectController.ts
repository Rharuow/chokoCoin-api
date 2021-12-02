import { Request, Response } from "express";
import { ListProjectService } from "../../services/Project/ListProjectService";

export class ListProjectController {
  async handle(req: Request, res: Response) {
    const listProjectService = new ListProjectService();

    try {
      const project = await listProjectService.execute();

      return res.json(project);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}
