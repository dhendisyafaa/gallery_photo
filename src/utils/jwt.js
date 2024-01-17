import dotenv from "dotenv";
dotenv.config();
import jsonWebToken from "jsonwebtoken";

export const generateAccessToken = (user) => {
  return jsonWebToken.sign(user, process.env.JWT_SECRET, {
    expiresIn:
      process.env.JWT_EXPIRES_IN != null ? process.env.JWT_EXPIRES_IN : "1800s",
  });
};

export const generateRefreshToken = (user) => {
  return jsonWebToken.sign(user, process.env.JWT_REFRESH_SECRET, {
    expiresIn:
      process.env.JWT_REFRESH_EXPIRES_IN != null
        ? process.env.JWT_REFRESH_EXPIRES_IN
        : "1800s",
  });
};

export const verifyRefreshToken = (token) => {
  try {
    return jsonWebToken.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    return null;
  }
};

export const parseJWT = (token) => {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};

export const verifyAcessToken = (token) => {
  try {
    return jsonWebToken.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};
