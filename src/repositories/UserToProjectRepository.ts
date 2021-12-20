import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { UserToProject } from "../entities/UserToProject";
import { UserRepository } from "./UserRepository";

@EntityRepository(UserToProject)
export class UserToProjectRepository extends Repository<UserToProject> {}
