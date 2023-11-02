import fs from "fs";
import { getData, insertData, deleteData, editData } from "../utils/util.js";

class PostsController {
  getAllPost(req, res) {
    try {
      const post = getData("posts");
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  }

  getPostById(req, res) {
    const postId = req.params.id;
    try {
      const posts = getData("posts");
      const post = posts.find((post) => post.id == postId);

      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  }

  createPost(req, res) {
    const newPost = req.body;

    try {
      let posts = getData("posts");
      const maxId = posts.reduce(
        (max, post) => (post.id > max ? post.id : max),
        0
      );
      newPost.id = maxId + 1;
      insertData("posts", newPost);
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  deletePost(req, res) {
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
      res.status(400).json({ error: "Invalid user ID" });
      return;
    }
    try {
      const users = deleteData("users", userId);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  }

  editPost(req, res) {
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
      res.status(400).json({ error: "Invalid user ID" });
      return;
    }

    const updatedUser = req.body;
    try {
      const users = editData("users", userId, updatedUser);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default PostsController;
