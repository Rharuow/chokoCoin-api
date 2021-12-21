import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
  JoinTable,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Project } from "./Project";
import { v4 as uuid } from "uuid";

@Entity("users_to_projects")
export class UserToProject {
  @PrimaryColumn()
  readonly id: string;
  @Column()
  readonly user_id: string;
  @Column()
  readonly project_id: string;
  @Column()
  value: string;
  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  partners: User[];
  @ManyToOne(() => Project)
  @JoinColumn({ name: "project_id" })
  projects: Project[];

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
