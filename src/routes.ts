import { Router } from "express";
import { RootController } from "./controllers/RootController";
import { CreateUserController } from "./controllers/User/CreateUserController";
import { DeleteUserController } from "./controllers/User/DeleteUserController";
import { ListUserController } from "./controllers/User/ListUserController";
import { CreateSessionController } from "./controllers/Session/CreateSessionController";
import { ensurePermissionRegister } from "./middlewares/ensurePermissionRegister";

const router = Router();

const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const listUserController = new ListUserController();
const createSessionController = new CreateSessionController();

const rootController = new RootController();

router.get("/users", ensurePermissionRegister, listUserController.handle);
router.post("/users", ensurePermissionRegister, createUserController.handle);
router.delete("/users", ensurePermissionRegister, deleteUserController.handle);
router.post(
  "/login",
  /*ensurePermissionRegister,*/ createSessionController.handle
);

router.get("/", rootController.run);

export { router };
