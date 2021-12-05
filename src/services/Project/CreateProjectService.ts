import { getCustomRepository } from "typeorm";

import { ProjectRepository } from "../../repositories/ProjectRepository";
import { UserRepository } from "../../repositories/UserRepository";

interface IProjectRequest {
  name: string;
  value: number;
}

export class CreateProjectService {
  async execute({ name, value }: IProjectRequest) {
    const projectRepository = getCustomRepository(ProjectRepository);

    const projectAlreadyExists = await projectRepository.findOne({ name });

    if (projectAlreadyExists) throw new Error("project already exists");

    try {
      const project = projectRepository.create({
        name,
        value,
      });

      await projectRepository.save(project);

      return project;
    } catch (error) {
      console.log(" create project = ", error.message);
      throw new Error(error.message);
    }
  }
}
