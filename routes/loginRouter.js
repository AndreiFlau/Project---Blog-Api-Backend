const { Router } = require("express");
const passport = require("passport");
const loginRouter = Router();

loginRouter.post("/", passport.authenticate("local", { session: false }), (req, res) => {
  res.json({
    user: {
      id: req.user.user.id,
      email: req.user.user.email,
      username: req.user.user.username,
      author: req.user.user.isAuthor,
    },
    token: req.user.token,
  });
});

module.exports = loginRouter;
