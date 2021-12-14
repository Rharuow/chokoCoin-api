import { Project } from "../entities/Project";
import { User } from "../entities/User";

export interface IListProjectByUsersSerializer {
  project: {
    name: string;
    value: string;
    users: Array<User>;
  };
}

export class ListProjectByUsersSerializer {
  handle(project: Project, users: Array<User>): IListProjectByUsersSerializer {
    return {
      project: {
        name: project.name,
        value: project.value,
        users: users,
      },
    };
  }
}
