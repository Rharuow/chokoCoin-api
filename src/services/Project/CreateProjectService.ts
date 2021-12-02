import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";

import { ProjectRepository } from "../../repositories/ProjectRepository";
import { UserRepository } from "../../repositories/UserRepository";

interface IProjectRequest {
  name: string;
  value: number;
}

export class CreateProjectService {
  async execute({ name, value }: IProjectRequest) {
    const userRepository = getCustomRepository(UserRepository);

    const projectRepository = getCustomRepository(ProjectRepository);

    const projectAlreadyExists = await projectRepository.findOne({ name });

    if (projectAlreadyExists) throw new Error("project already exists");

    const project = projectRepository.create({
      name,
      value,
    });

    await projectRepository.save(project);

    return project;
  }
}
