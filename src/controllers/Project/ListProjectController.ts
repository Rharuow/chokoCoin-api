import { Request, Response } from "express";
import { ListProjectService } from "../../services/Project/ListProjectService";

export class ListProjectController {
  async handle(req: Request, res: Response) {
    const listProjectService = new ListProjectService();

    try {
      const projects = await listProjectService.execute();

      return res.json(projects);
    } catch (error) {
      console.log("Error > List Projects By Users = ", error.message);
      return res.status(400).send(error.message);
    }
  }
}
