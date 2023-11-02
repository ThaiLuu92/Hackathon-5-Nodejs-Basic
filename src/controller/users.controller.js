import fs from "fs";
import { getData, insertData, deleteData, editData } from "../utils/util.js";

class UsersController {
  getAllUser(req, res) {
    try {
      const users = getData("users");
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  }

  getUserById(req, res) {
    const userId = req.params.id;
    try {
      const users = getData("users");
      const user = users.find((user) => user.id == userId);

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  }

  createUser(req, res) {
    const newUser = req.body;

    try {
      let users = getData("users");
      const maxId = users.reduce(
        (max, user) => (user.id > max ? user.id : max),
        0
      );
      newUser.id = maxId + 1;
      insertData("users", newUser);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  deleteUser(req, res) {
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

  editUser(req, res) {
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

  getUserPosts(req, res) {
    const id = Number(req.params.id);
    const posts = getData("posts");
    const userPosts = posts.filter((post) => Number(post.userId) === id);

    if (userPosts.length > 0) {
      res.status(200).json(userPosts);
    } else {
      res
        .status(404)
        .json({ error: "Người dùng không tồn tại hoặc không có bài viết." });
    }
  }
}

  



export default UsersController;
