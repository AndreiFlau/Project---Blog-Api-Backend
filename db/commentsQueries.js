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

async function createCommentQuery(comment, id) {
  await prisma.comments.create({
    data: {
      content: comment.content,
      userId: id,
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

module.exports = { getCommentQuery, getAllCommentsQuery, createCommentQuery, deleteCommentQuery };
