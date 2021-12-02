import { EntityRepository, Repository } from "typeorm";
import { Project } from "../entities/Project";

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {}
