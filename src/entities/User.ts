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
import { Project } from "./Project";
import { UserToProject } from "./UserToProject";

@Entity("users")
export class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  token: string;

  @Column()
  is_active: boolean;

  @Column()
  is_admin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany((type) => Project)
  @JoinTable()
  projectsByUser: Project[];

  @OneToMany(() => UserToProject, (userToProject) => userToProject.project)
  @JoinTable()
  projects: UserToProject[];

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
