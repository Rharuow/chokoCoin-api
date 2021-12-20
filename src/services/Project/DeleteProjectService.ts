import { getCustomRepository } from "typeorm";

import { ProjectRepository } from "../../repositories/ProjectRepository";
import { GetUserByTokenService } from "../User/GetUserByTokenService";

interface IProjectRequest {
  id: string;
  token: string;
}

export class DeleteProjectService {
  async execute({ id, token }: IProjectRequest) {
    const projectRepository = getCustomRepository(ProjectRepository);
    const getUserByTokenService = new GetUserByTokenService();

    try {
      const user = await getUserByTokenService.execute(token);

      const project = await projectRepository.delete(id)

      return project;
    } catch (error) {
      console.log(" delete project = ", error.message);
      throw new Error(error.message);
    }
  }
}
