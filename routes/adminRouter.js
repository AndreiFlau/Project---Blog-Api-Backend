const { Router } = require("express");
const { getAllUsers, deleteUser, getUser, createUser } = require("../controllers/userController");
const {
  getAllPosts,
  getPost,
  createPost,
  deletePost,
  editPost,
  publishPost,
  unpublishPost,
} = require("../controllers/postController");
const {
  getAllComments,
  getComment,
  createComment,
  deleteComment,
  getAllCommentsFromPost,
  editComment,
} = require("../controllers/commentsController");
const adminRouter = Router();

adminRouter.get("/users", getAllUsers);
adminRouter.get("/users/:id", getUser);
adminRouter.post("/users", createUser);
adminRouter.delete("/users/:id", deleteUser);

//posts
adminRouter.get("/posts", getAllPosts);
adminRouter.get("/posts/:id", getPost);
adminRouter.post("/posts", createPost);
adminRouter.delete("/posts/:id", deletePost);
adminRouter.put("/posts/:id", editPost);

//comments
adminRouter.get("/comments", getAllComments);
adminRouter.get("/posts/:id/comments", getAllCommentsFromPost);
adminRouter.get("/comments/:id", getComment);
adminRouter.post("/posts/:id/comments", createComment);
adminRouter.delete("/comments/:id", deleteComment);
adminRouter.put("/comments/:id", editComment);

module.exports = adminRouter;
