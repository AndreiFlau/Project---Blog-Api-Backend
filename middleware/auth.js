const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
require("dotenv").config();

const prisma = new PrismaClient();

module.exports = function () {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await prisma.user.findFirst({
          where: {
            username: username,
          },
        });

        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect password" });
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: "7d" });

        return done(null, { user, token });
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.use(
    new JwtStrategy(
      { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: process.env.SECRET_KEY },
      async (jwtPayload, done) => {
        try {
          const user = await prisma.user.findFirst({
            where: {
              id: jwtPayload.id,
            },
          });

          if (!user) {
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  // passport.serializeUser((user, done) => {
  //   done(null, user.id);
  // });

  // passport.deserializeUser(async (id, done) => {
  //   try {
  //     const user = await prisma.user.findFirst({
  //       where: {
  //         id: id,
  //       },
  //     });

  //     done(null, user);
  //   } catch (err) {
  //     done(err);
  //   }
  // });
};
