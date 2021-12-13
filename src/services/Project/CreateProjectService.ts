import { getCustomRepository } from "typeorm";

import { ProjectRepository } from "../../repositories/ProjectRepository";
import { UserToProjectRepository } from "../../repositories/UserToProject";
import { GetUserByTokenService } from "../User/GetUserByTokenService";

interface IProjectRequest {
  name: string;
  value: string;
  token: string;
}

export class CreateProjectService {
  async execute({ name, value, token }: IProjectRequest) {
    const projectRepository = getCustomRepository(ProjectRepository);
    const getUserByTokenService = new GetUserByTokenService();
    const userToProjectRepository = getCustomRepository(
      UserToProjectRepository
    );

    const projectAlreadyExists = await projectRepository.findOne({ name });

    if (projectAlreadyExists) throw new Error("project already exists");

    try {
      const user = await getUserByTokenService.execute(token);

      const project = projectRepository.create({
        name,
        value,
      });

      const userToProject = userToProjectRepository.create({
        user_id: user.id,
        project_id: project.id,
        value: "0",
        project,
        user,
      });

      await projectRepository.save(project);

      await userToProjectRepository.save(userToProject);

      return project;
    } catch (error) {
      console.log(" create project = ", error.message);
      throw new Error(error.message);
    }
  }
}
