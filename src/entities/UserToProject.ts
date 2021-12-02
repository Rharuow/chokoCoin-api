import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Project } from "./Project";

@Entity("usersToProjects")
export class UserToProject {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  user_id: number;
  @Column()
  project_id: number;
  @Column()
  value: number;
  @ManyToOne(() => User, (user) => user.userToProject)
  user: User;
  @ManyToOne(() => Project, (project) => project.projectToUser)
  project: Project;
}
