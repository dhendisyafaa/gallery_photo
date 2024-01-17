import {
  findAllUsers,
  findUserById,
  removeUser,
  updateUserData,
} from "../services/user.service.js";
import { responseError, responseSuccess } from "../utils/response.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await findAllUsers();
    responseSuccess(res, 200, "successfully get user data", users);
  } catch (error) {
    responseError(res, 400, "failed to get user", error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findUserById(id);
    if (!user) {
      return res.status(404).json({
        error: "data not found",
        message: `user with id ${id} not found`,
        data: null,
      });
    }
    responseSuccess(res, 200, "successfully get user data", user);
  } catch (error) {
    responseError(res, 400, "failed to get user", error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const checkUser = await findUserById(id);
    if (!checkUser) {
      return res.status(404).json({
        message: `user with id ${id} not found`,
        data: null,
      });
    }

    const user = await updateUserData(id, req.body);
    responseSuccess(res, 200, "successfully update user data", user);
  } catch (error) {
    responseError(res, 400, "failed to update user", error);
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const checkUser = await findUserById(id);
    if (!checkUser) {
      return res.status(404).json({
        message: `user with id ${id} not found`,
        data: null,
      });
    }
    await removeUser(id);
    responseSuccess(res, 200, "successfully delete user data");
  } catch (error) {
    responseError(res, 400, "failed to delete user", error);
  }
};
