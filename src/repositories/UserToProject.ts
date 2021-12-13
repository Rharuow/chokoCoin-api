import { EntityRepository, Repository } from "typeorm";
import { UserToProject } from "../entities/UserToProject";

@EntityRepository(UserToProject)
export class UserToProjectRepository extends Repository<UserToProject> {}
