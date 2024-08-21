const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getAllCommentsQuery() {
  const comments = await prisma.comments.findMany();
  return comments;
}

async function getCommentQuery(id) {
  const comment = await prisma.comments.findFirst({
    where: {
      id: id,
    },
  });
  return comment;
}

async function getAllCommentsFromPostQuery(postId) {
  const comments = await prisma.posts.findFirst({
    where: {
      id: postId,
    },
    include: {
      Comments: true,
    },
  });
  return comments.Comments;
}

async function createCommentQuery(comment, id, postId) {
  await prisma.comments.create({
    data: {
      content: comment.content,
      userId: id,
      postId: postId,
    },
  });
}

async function deleteCommentQuery(id) {
  await prisma.comments.delete({
    where: {
      id: id,
    },
  });
}

module.exports = { getCommentQuery, getAllCommentsQuery, getAllCommentsFromPostQuery, createCommentQuery, deleteCommentQuery };
