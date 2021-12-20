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

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @OneToMany(() => UserToProject, (usersToProject) => usersToProject.partner)
  @JoinTable()
  partners: UserToProject[];

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
