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

async function createPostQuery(post, id) {
  const createdPost = await prisma.posts.create({
    data: {
      title: post.title,
      content: post.content,
      userId: id,
    },
  });

  return createdPost.id;
}

async function deletePostQuery(id) {
  await prisma.user.delete({
    where: {
      id: id,
    },
  });
}

async function editPostQuery(postId, post) {
  await prisma.posts.update({
    where: {
      id: postId,
    },
    data: {
      title: post.title,
      content: post.content,
    },
  });
}

module.exports = { getAllPostsQuery, getPostQuery, createPostQuery, deletePostQuery, editPostQuery };
