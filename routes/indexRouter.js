const { Router } = require("express");
const { getAllUsers, deleteUser, getUser, createUser } = require("../controllers/userController");
const { getAllPosts, getPost, createPost, deletePost } = require("../controllers/postController");
const {
  getAllComments,
  getComment,
  createComment,
  deleteComment,
  getAllCommentsFromPost,
} = require("../controllers/commentsController");
const apiRouter = Router();

//user
apiRouter.get("/users", getAllUsers);
apiRouter.get("/users/:id", getUser);

//posts
apiRouter.get("/posts", getAllPosts);
apiRouter.get("/posts/:id", getPost);
apiRouter.post("/posts", createPost);

//comments
apiRouter.get("/comments", getAllComments);
apiRouter.get("/posts/:id/comments", getAllCommentsFromPost);
apiRouter.get("/comments/:id", getComment);
apiRouter.post("/posts/:id/comments", createComment);

module.exports = apiRouter;
