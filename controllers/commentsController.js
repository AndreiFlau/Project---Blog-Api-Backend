const asyncHandler = require("express-async-handler");
const { getAllCommentsQuery, getCommentQuery, createCommentQuery, deleteCommentQuery } = require("../db/commentsQueries");

exports.getAllComments = asyncHandler(async (req, res) => {
  try {
    const comments = await getAllCommentsQuery();
    if (comments.length === 0) {
      throw Error("There are no comments.");
    }
    return res.send(comments);
  } catch (error) {
    return res.send(`Oops, couldn't find any comments. Error: ${error}`);
  }
});

exports.getComment = asyncHandler(async (req, res) => {
  try {
    const id = Number(req.params.id);
    const comment = await getCommentQuery(id);
    if (comment.length === 0) {
      throw Error;
    }
    return res.send(comment);
  } catch (error) {
    return res.send(`Oops, couldn't find the comment requested. Error: ${error}`);
  }
});

exports.createComment = asyncHandler(async (req, res) => {
  try {
    const comment = {
      content: req.body.content,
    };

    //get userid based on session id

    const commentQ = await createCommentQuery(comment);

    return res.send(commentQ);
  } catch (error) {
    return res.send(`Oops, couldn't create the comment requested. Error: ${error}`);
  }
});

exports.deleteComment = asyncHandler(async (req, res) => {
  try {
    const id = Number(req.params.id);
    const comment = await deleteCommentQuery(id);

    return res.send(`Deleted comment with id ${id} successfully!`);
  } catch (error) {
    return res.send(`Oops, couldn't delete the comment requested. Error: ${error}`);
  }
});
