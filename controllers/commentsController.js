const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const {
  getAllCommentsQuery,
  getCommentQuery,
  createCommentQuery,
  deleteCommentQuery,
  getAllCommentsFromPostQuery,
  editCommentQuery,
} = require("../db/commentsQueries");

const validateComment = [body("content").isLength({ min: 1, max: 1000 }).withMessage("Comment is too long.")];

exports.getAllComments = asyncHandler(async (req, res) => {
  try {
    const comments = await getAllCommentsQuery();
    if (comments.length === 0) {
      throw Error("There are no comments.");
    }
    return res.send(comments);
  } catch (error) {
    return res.json({
      message: "Oops, couldn't find any comments.",
      error: error.message,
    });
  }
});

exports.getAllCommentsFromPost = asyncHandler(async (req, res) => {
  try {
    const postId = Number(req.params.id);
    const comments = await getAllCommentsFromPostQuery(postId);
    if (comments.length === 0) {
      throw Error("There are no comments.");
    }
    return res.send(comments);
  } catch (error) {
    return res.json({
      message: "Oops, couldn't find any comments.",
      error: error.message,
    });
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
    return res.json({
      message: "Oops, couldn't find the comment requested.",
      error: error.message,
    });
  }
});

exports.createComment = [
  validateComment,
  asyncHandler(async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({
          message: "Oops, couldn't create the comment requested.",
          error: errors,
        });
      }
      const postId = Number(req.params.id);
      const comment = {
        content: req.body.content,
      };

      //get userid based on session id
      const id = Number(req.user.id);

      const commentQ = await createCommentQuery(comment, id, postId);

      return res.send("Comment created successfully!");
    } catch (error) {
      return res.json({
        message: "Oops, couldn't create the comment requested.",
        error: error.message,
      });
    }
  }),
];

exports.deleteComment = asyncHandler(async (req, res) => {
  try {
    const id = Number(req.params.id);
    const comment = await deleteCommentQuery(id);

    return res.send(`Deleted comment with id ${id} successfully!`);
  } catch (error) {
    return res.json({
      message: "Oops, couldn't delete the comment requested.",
      error: error.message,
    });
  }
});

exports.editComment = asyncHandler(async (req, res) => {
  try {
    const commentId = Number(req.params.id);

    const comment = {
      content: req.body.content,
    };

    await editCommentQuery(commentId, comment);

    return res.send("Comment edited successfully!");
  } catch (error) {
    return res.json({
      message: "Oops, couldn't edit the comment requested.",
      error: error.message,
    });
  }
});

// exports.editCategoryPost = [
//   validateCategory,
//   asyncHandler(async (req, res) => {
//     const errors = validationResult(req);
//     const categoryId = req.params.id;
//     const category = await getSingleCategory(categoryId);
//     if (!errors.isEmpty()) {
//       return res.status(400).render("./changecategories/editcategory", {
//         errors: errors.array(),
//         category: category,
//       });
//     }
//     const name = req.body.categoryname;
//     await editCategory(categoryId, name);
//     res.redirect("/categories");
//   }),
// ];
