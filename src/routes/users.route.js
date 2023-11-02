import express from "express";
import UsersController from "../controller/users.controller.js";
import { checkUserExistsByEmail } from "../middwave/middleware.js";
const usesRouter = express.Router();
const usersController = new UsersController();

usesRouter.get("/:id", usersController.getUserById);

usesRouter.get("/:id/posts", usersController.getUserPosts);

usesRouter.get("/", usersController.getAllUser);

usesRouter.post("/",checkUserExistsByEmail, usersController.createUser);

usesRouter.delete("/:id", usersController.deleteUser);

usesRouter.put("/:id", usersController.editUser);



export default usesRouter;
