const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getAllUsersQuery() {
  const users = await prisma.user.findMany();
  return users;
}

async function getUserQuery(id) {
  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });
  return user;
}

async function createUserQuery(user) {
  await prisma.user.create({
    data: {
      email: user.email,
      username: user.username,
      password: user.password,
      isAuthor: user.isAuthor,
    },
  });
}

async function deleteUserQuery(id) {
  await prisma.user.delete({
    where: {
      id: id,
    },
  });
}

module.exports = { getAllUsersQuery, deleteUserQuery, getUserQuery, createUserQuery };
