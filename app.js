const express = require("express");
const path = require("path");
const indexRouter = require("./routes/indexRouter");
const loginRouter = require("./routes/logInRouter");
const auth = require("./middleware/auth");
const passport = require("passport");
const cors = require("cors");
const registerRouter = require("./routes/registerRouter");
const adminRouter = require("./routes/adminRouter");
const authAdmin = require("./middleware/authAdmin");
const app = express();
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.set(("views", path.join(__dirname, "views")));
app.set("view engine", "ejs");
auth(app);

app.use("/api", passport.authenticate("jwt", { session: false }), indexRouter);
app.use("/admin", passport.authenticate("jwt", { session: false }), authAdmin, adminRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`listening to port: ${PORT}`));
