const asyncHandler = require("express-async-handler");
const { getAllUsersQuery, deleteUserQuery, getUserQuery, createUserQuery } = require("../db/userQueries");
const { parseBoolean } = require("../parseBool");
const bcrypt = require("bcryptjs");

exports.getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await getAllUsersQuery();
    if (users.length === 0) {
      throw Error("There are no users.");
    }
    return res.send(users);
  } catch (error) {
    return res.send(`Oops, couldn't find any user. Error: ${error}`);
  }
});

exports.getUser = asyncHandler(async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await getUserQuery(id);
    return res.send(user);
  } catch (error) {
    return res.send(`Oops, couldn't find this user. Error: ${error}`);
  }
});

exports.createUser = asyncHandler(async (req, res) => {
  try {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        console.log(err.message);
      }
      const user = {
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
        isAuthor: parseBoolean(req.body.isauthor),
      };
      const userQ = await createUserQuery(user);
      return res.send(`User created successfully! ${userQ}`);
    });
  } catch (error) {
    return res.send(`Oops, couldn't create this user. Error: ${error}`);
  }
});

exports.deleteUser = asyncHandler(async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deletedUser = await deleteUserQuery(id);
    return res.send(`Deleted user with id ${id} successfully!`);
  } catch (error) {
    return res.send(`Oops, couldn't delete this user. Error: ${error}`);
  }
});
