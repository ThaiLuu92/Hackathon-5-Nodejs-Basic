import express from "express";
import PostsController from "../controller/posts.controller.js";
const postRouter = express.Router();
const postsController = new PostsController();

postRouter.get("/:id", postsController.getPostById);

postRouter.get("/", postsController.getAllPost);

postRouter.post("/", postsController.createPost);

postRouter.delete("/:id", postsController.deletePost);

postRouter.put("/:id", postsController.editPost);

export default postRouter;
