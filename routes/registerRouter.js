const { Router } = require("express");
const { createUser } = require("../controllers/userController");

const registerRouter = Router();

registerRouter.post("/", createUser);

module.exports = registerRouter;
