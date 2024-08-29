const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const prisma = new PrismaClient();

async function authAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: req.user.id,
        isAdmin: true,
      },
    });

    if (!user) {
      return res.status(403).json({ message: "Access denied. Admin privileges required." });
    }

    next();
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Something happened on the server." });
  }
}

module.exports = authAdmin;
