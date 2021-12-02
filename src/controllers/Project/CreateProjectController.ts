import { Request, Response } from "express";
import { CreateProjectService } from "../../services/Project/CreateProjectService";

export class CreateProjectController {
  async handle(req: Request, res: Response) {
    const params = req.body as { name: string; value: number };

    const createProjectService = new CreateProjectService();

    try {
      const project = await createProjectService.execute(params);

      return res.json(project);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}
