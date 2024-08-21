const express = require("express");
const path = require("path");
const indexRouter = require("./routes/indexRouter");
const loginRouter = require("./routes/logInRouter");
const auth = require("./middleware/auth");
const passport = require("passport");
const app = express();
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set(("views", path.join(__dirname, "views")));
app.set("view engine", "ejs");
auth(app);

app.use("/api", passport.authenticate("jwt", { session: false }), indexRouter);
app.use("/login", loginRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`listening to port: ${PORT}`));
