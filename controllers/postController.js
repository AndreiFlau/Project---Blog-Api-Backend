const asyncHandler = require("express-async-handler");
const {
  getAllPostsQuery,
  getPostQuery,
  createPostQuery,
  deletePostQuery,
  editPostQuery,
  publishPostQuery,
  unpublishPostQuery,
} = require("../db/postQueries");
const { parseBoolean } = require("../parseBool");

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

    return res.send(`Post created successfully! Your post ID is: ${postQ}`);
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

exports.editPost = asyncHandler(async (req, res) => {
  try {
    const postId = Number(req.params.id);

    let published = false;

    if (req.body.published) {
      published = parseBoolean(req.body.published);
    }

    const post = {
      title: req.body.title,
      content: req.body.content,
      published: published,
    };

    await editPostQuery(postId, post);

    return res.send("post edited successfully!");
  } catch (error) {
    return res.json({
      message: "Oops, couldn't edit the post requested.",
      error: error.message,
    });
  }
});
