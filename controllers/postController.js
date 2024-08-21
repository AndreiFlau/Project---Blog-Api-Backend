const asyncHandler = require("express-async-handler");
const { getAllPostsQuery, getPostQuery, createPostQuery, deletePostQuery } = require("../db/postQueries");

exports.getAllPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await getAllPostsQuery();
    if (posts.length === 0) {
      throw Error("There are no posts.");
    }
    return res.send(posts);
  } catch (error) {
    return res.send(`Oops, couldn't find any posts. Error: ${error}`);
  }
});

exports.getPost = asyncHandler(async (req, res) => {
  try {
    const id = Number(req.params.id);
    const post = await getPostQuery(id);
    if (post.length === 0) {
      throw Error;
    }
    return res.send(post);
  } catch (error) {
    return res.send(`Oops, couldn't find the post requested. Error: ${error}`);
  }
});

exports.createPost = asyncHandler(async (req, res) => {
  try {
    const post = {
      title: req.body.title,
      content: req.body.content,
    };

    const id = Number(req.user.id);

    const postQ = await createPostQuery(post, id);

    return res.send("Post created successfully!");
  } catch (error) {
    return res.send(`Oops, couldn't create the post requested. Error: ${error}`);
  }
});

exports.deletePost = asyncHandler(async (req, res) => {
  try {
    const id = Number(req.params.id);
    const post = await deletePostQuery(id);

    return res.send(`Deleted post with id ${id} successfully!`);
  } catch (error) {
    return res.send(`Oops, couldn't delete the post requested. Error: ${error}`);
  }
});
