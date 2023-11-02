import postRouter from "./posts.route.js";
import usesRouter from "./users.route.js";



export function route(app) {
  // API Users
  app.use("/api/v1/users", usesRouter);

  // API Posts
  app.use("/api/v1/posts", postRouter);
}
