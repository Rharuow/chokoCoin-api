import { getCustomRepository } from "typeorm";
import { ProjectRepository } from "../../repositories/ProjectRepository";

export class ListProjectService {
  async execute() {
    const projectRepository = getCustomRepository(ProjectRepository);

    const projects = await projectRepository.find({
      relations: ["users"],
    });

    projects.forEach((project) => {
      console.log(project);
    });

    return projects;
  }
}
