import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export const signJwt = (user) =>
  jwt.sign(
    {
      sub: user._id,
      role: user.role,
      username: user.username
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

export const verifyJwt = (token) => jwt.verify(token, JWT_SECRET);

