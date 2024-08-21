const { Router } = require("express");
const passport = require("passport");
const loginRouter = Router();

loginRouter.post("/", passport.authenticate("local", { session: false }), (req, res) => {
  res.json({
    user: req.user.user,
    token: req.user.token,
  });
});

module.exports = loginRouter;
