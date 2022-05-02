const { verify } = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET || "secret";

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    req.user = verify(token, jwtSecret);
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid Token" });
  }
};
