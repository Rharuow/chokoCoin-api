import _ from "lodash";
import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { UserToProject } from "../entities/UserToProject";
import { ProjectRepository } from "./ProjectRepository";
import { UserRepository } from "./UserRepository";

@EntityRepository(UserToProject)
export class UserToProjectRepository extends Repository<UserToProject> {
  async findProjectsByPartners() {
    const projectsRepository = getCustomRepository(ProjectRepository);

    const partnersByProject = await this.find({
      relations: ["partners", "projects"],
    });

    const allProjects = await projectsRepository.find();

    const projects = allProjects.map((project) => ({
      id: project.id,
      name: project.name,
      value: project.value,
      partners: partnersByProject
        .filter(
          (partnerByProject) => partnerByProject.project_id === project.id
        )
        .map(({ partners, value }) => {
          _.unset(partners, ["password", "token", "created_at", "updated_at"]);
          return { ...partners, value };
        }),
    }));

    return projects;
  }
}
