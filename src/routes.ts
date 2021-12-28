import { Router } from "express";
import { RootController } from "./controllers/RootController";
import { CreateUserController } from "./controllers/User/CreateUserController";
import { RegistrateUserController } from "./controllers/User/RegistrateUserController";
import { DeleteUserController } from "./controllers/User/DeleteUserController";
import { ListUserController } from "./controllers/User/ListUserController";
import { GetUserByTokenController } from "./controllers/User/GetUserByTokenController";
import { DeleteProjectController } from "./controllers/Project/DeleteProjectController";
import { CreateProjectController } from "./controllers/Project/CreateProjectController";
import { ListProjectController } from "./controllers/Project/ListProjectController";
import { CreateSessionController } from "./controllers/Session/CreateSessionController";

import { ensurePermissionRegister } from "./middlewares/ensurePermissionRegister";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const registrateUserController = new RegistrateUserController();
const deleteUserController = new DeleteUserController();
const listUserController = new ListUserController();
const getUserByTokenController = new GetUserByTokenController();

const createSessionController = new CreateSessionController();

const deleteProjectController = new DeleteProjectController();
const createProjectController = new CreateProjectController();
const listProjectController = new ListProjectController();

const rootController = new RootController();

router.get("/session", ensureAuthenticated, getUserByTokenController.handle);

router.get("/users", ensureAuthenticated, listUserController.handle);
router.post("/users/confirmation", registrateUserController.handle);
router.post("/users", ensurePermissionRegister, createUserController.handle);
router.delete("/users/:id", ensureAuthenticated, deleteUserController.handle);
router.post(
  "/login",
  /*ensurePermissionRegister,*/ createSessionController.handle
);
router.delete(
  "/projects/:id",
  ensureAuthenticated,
  deleteProjectController.handle
);
router.post("/projects", ensureAuthenticated, createProjectController.handle);
router.get("/projects", ensureAuthenticated, listProjectController.handle);

router.get("/", rootController.run);

export { router };
