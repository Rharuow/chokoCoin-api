import { Router } from "express";
import { RootController } from "./controllers/RootController";
import { CreateUserController } from "./controllers/User/CreateUserController";
import { DeleteUserController } from "./controllers/User/DeleteUserController";
import { ListUserController } from "./controllers/User/ListUserController";
import { GetUserByTokenController } from "./controllers/User/GetUserByTokenController";
import { CreateProjectController } from "./controllers/Project/CreateProjectController";
import { ListProjectController } from "./controllers/Project/ListProjectController";
import { CreateSessionController } from "./controllers/Session/CreateSessionController";

import { ensurePermissionRegister } from "./middlewares/ensurePermissionRegister";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const listUserController = new ListUserController();
const getUserByTokenController = new GetUserByTokenController();

const createSessionController = new CreateSessionController();

const createProjectController = new CreateProjectController();
const listProjectController = new ListProjectController();

const rootController = new RootController();

router.get("/user", ensureAuthenticated, getUserByTokenController.handle);

router.get("/users", ensurePermissionRegister, listUserController.handle);
router.post("/users", ensurePermissionRegister, createUserController.handle);
router.delete("/users", ensurePermissionRegister, deleteUserController.handle);
router.post(
  "/login",
  /*ensurePermissionRegister,*/ createSessionController.handle
);
router.post("/projects", ensureAuthenticated, createProjectController.handle);
router.get("/projects", ensureAuthenticated, listProjectController.handle);

router.get("/", rootController.run);

export { router };
