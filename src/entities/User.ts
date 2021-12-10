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
  isActive: boolean;
  
  @Column()
  isAdmin: boolean

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserToProject, (userToProject) => userToProject.user)
  userToProject: UserToProject[];

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
