import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { UserToProject } from "./UserToProject";

@Entity("projects")
export class Project {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserToProject, (userToProject) => userToProject.project)
  projectToUser: UserToProject[];

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
