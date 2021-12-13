import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { Project } from "./Project";
import { v4 as uuid } from "uuid";

@Entity("users_to_projects")
export class UserToProject {
  @PrimaryColumn()
  readonly id: string;
  @Column()
  user_id: string;
  @Column()
  project_id: string;
  @Column()
  value: string;
  @ManyToOne(() => User, (user) => user.userToProject)
  user: User;
  @ManyToOne(() => Project, (project) => project.projectToUser)
  project: Project;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
