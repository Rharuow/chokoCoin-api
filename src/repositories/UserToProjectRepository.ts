import _ from "lodash";
import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { UserToProject } from "../entities/UserToProject";
import { GetUserByTokenService } from "../services/User/GetUserByTokenService";
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

  async findUsersWithProjects(token: string) {
    const userRepository = getCustomRepository(UserRepository);
    const getUserByToken = new GetUserByTokenService();

    const allUsers = await userRepository.find();

    const projects = await this.findProjectsByPartners();

    const currentUser = await getUserByToken.execute(token);

    const users = allUsers
      .map((user) => ({
        id: user.id,
        email: user.email,
        username: user.username,
        is_admin: user.is_admin,
        is_active: user.is_active,
        projects,
      }))
      .filter((user) => user.id !== currentUser.id);

    return users;
  }
}
