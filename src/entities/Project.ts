import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";
import { UserToProject } from "./UserToProject";

@Entity("projects")
export class Project {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  value: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany((type) => User)
  @JoinTable({
    name: "projects_users", // table name for the junction table of this relation
    joinColumn: {
      name: "project",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "user",
      referencedColumnName: "id",
    },
  })
  users: User[];

  @OneToMany(() => UserToProject, (usersToProject) => usersToProject.project)
  @JoinTable()
  partners: UserToProject[];

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
