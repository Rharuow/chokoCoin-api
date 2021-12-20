import { getCustomRepository } from "typeorm";

import { ProjectRepository } from "../../repositories/ProjectRepository";
import { UserToProjectRepository } from "../../repositories/UserToProjectRepository";
import { GetUserByTokenService } from "../User/GetUserByTokenService";

interface IProjectRequest {
  id: string;
  token: string;
}

export class DeleteProjectService {
  async execute({ id, token }: IProjectRequest) {
    const projectRepository = getCustomRepository(ProjectRepository);
    const getUserByTokenService = new GetUserByTokenService();
    const userToProjectRepository = getCustomRepository(
      UserToProjectRepository
    );

    try {
      const user = await getUserByTokenService.execute(token);

      const userToPRoject = await userToProjectRepository.delete({
        user_id: user.id,
        project_id: id,
      });

      await projectRepository.delete(id);

      const projects = await projectRepository.find();

      return projects;
    } catch (error) {
      console.log(" delete project = ", error.message);
      throw new Error(error.message);
    }
  }
}
