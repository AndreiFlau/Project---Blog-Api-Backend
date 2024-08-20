const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getAllPostsQuery() {
  const posts = await prisma.posts.findMany();
  return posts;
}

async function getPostQuery(id) {
  const post = await prisma.posts.findFirst({
    where: {
      id: id,
    },
  });
  return post;
}

async function createPostQuery(post) {
  await prisma.posts.create({
    data: {
      title: post.title,
      content: post.content,
    },
  });
}

async function deletePostQuery(id) {
  await prisma.user.delete({
    where: {
      id: id,
    },
  });
}

module.exports = { getAllPostsQuery, getPostQuery, createPostQuery, deletePostQuery };
