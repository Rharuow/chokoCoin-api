import { getCustomRepository } from "typeorm";
import { ProjectRepository } from "../../repositories/ProjectRepository";

export class ListProjectService {
  async execute() {
    const projectRepository = getCustomRepository(ProjectRepository);

    const projects = await projectRepository.find();

    return projects;
  }
}
