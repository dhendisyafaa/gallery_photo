import { checkingUsername, login, register } from "../services/auth.service.js";
import { compare, encript } from "../utils/brycpt.js";
import {
  generateAccessToken,
  generateRefreshToken,
  parseJWT,
  verifyRefreshToken,
} from "../utils/jwt.js";
import { responseError, responseSuccess } from "../utils/response.js";

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const checkUsername = await checkingUsername(username);
    if (checkUsername)
      return res.status(400).json({ message: "Username sudah terdaftar!" });

    const hash = encript(password);

    const dataUser = {
      ...req.body,
      password: hash,
    };

    const user = await register(dataUser);
    responseSuccess(res, 200, "successfully register a user account", user);
  } catch (error) {
    responseError(res, 400, "failed to register a user account", error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await login(email);

    if (!user) {
      return res.status(404).json({
        error: "user not found",
        message: "email not found",
        data: null,
      });
    }

    if (!compare(password, user.password)) {
      return res.status(400).json({
        error: "wrong password",
        message: "failed for login",
        data: null,
      });
    }

    const payload = {
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    const data = {
      accessToken,
      refreshToken,
    };
    responseSuccess(res, 200, "successfully login", data);
  } catch (error) {
    responseError(res, 400, "failed login", error);
  }
};

export const loginWithGoogle = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await login(email);
    if (!user) {
      return res.status(404).json({
        error: "user not found",
        message: "email not found",
        data: null,
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const data = {
      accessToken,
      refreshToken,
    };

    responseSuccess(res, 200, "successfully login", data);
  } catch (error) {
    responseError(res, 400, "failed login", error);
  }
};

export const refreshToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Verifikasi token failed",
        data: null,
      });
    }
    const verify = verifyRefreshToken(token);
    if (!verify) {
      return res.status(401).json({
        error: "Token not valid",
        message: "Refresh token failed",
        data: null,
      });
    }
    const tokenParsed = parseJWT(token);
    const user = await login(tokenParsed.email);
    if (!user) {
      return res.status(404).json({
        error: "Token not valid",
        message: "Refresh token failed",
        data: null,
      });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const data = {
      // ...user,
      accessToken,
      refreshToken,
    };
    responseSuccess(res, 200, "successfully get refresh token", data);
  } catch (error) {
    responseError(res, 400, "failed get refresh token", error);
  }
};
