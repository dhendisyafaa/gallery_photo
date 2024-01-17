import { verifyAcessToken } from "../utils/jwt.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Verifikasi token failed",
      data: null,
    });
  }
  const user = verifyAcessToken(token);
  if (!user) {
    return res.status(401).json({
      error: "Token not valid",
      message: "Verifikasi token failed",
      data: null,
    });
  }
  next();
};
