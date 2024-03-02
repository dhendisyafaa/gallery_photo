import { removeImageInCloudinary } from "../services/image.service.js";
import {
  changeAvatarUser,
  findAllUsers,
  findUserAvatar,
  findUserById,
  findUserByUsername,
  findUsersLength,
  removeAvatarUser,
  removeUser,
  updateUserData,
  userStatistics,
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

export const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(404).json({
        error: "data not found",
        message: `user with username ${username} not found`,
        data: null,
      });
    }
    responseSuccess(res, 200, "successfully get user data", user);
  } catch (error) {
    responseError(res, 400, "failed to get user", error);
  }
};

export const getAvatarUser = async (req, res) => {
  try {
    const { id } = req.params;
    const avatar = await findUserAvatar(id);
    responseSuccess(res, 200, "successfully get avatar data", avatar);
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

export const updateAvatarUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findUserById(id);
    if (!user) {
      return res.status(404).json({
        message: `user with id ${id} not found`,
        data: null,
      });
    }
    await changeAvatarUser(id, req.body);
    if (user.cloudinary_id) {
      await removeImageInCloudinary(user.cloudinary_id);
    }
    responseSuccess(res, 200, "successfully add avatar user");
  } catch (error) {
    responseError(res, 400, "failed to add avatar user", error);
  }
};

export const deleteAvatarUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findUserById(id);
    if (!user) {
      return res.status(404).json({
        message: `user with id ${id} not found`,
        data: null,
      });
    }
    await removeAvatarUser(id, user.cloudinary_id);
    responseSuccess(res, 200, "successfully delete avatar user");
  } catch (error) {
    responseError(res, 400, "failed to delete avatar user", error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { links } = req.body;
    const checkUser = await findUserById(id);
    if (!checkUser) {
      return res.status(404).json({
        message: `user with id ${id} not found`,
        data: null,
      });
    }

    const linksArray = links.split(", ");

    const data = {
      ...req.body,
      links: linksArray,
    };

    const user = await updateUserData(id, data);
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

export const getUsersLength = async (req, res) => {
  try {
    const users = await findUsersLength();
    responseSuccess(res, 200, "successfully get user length data", users);
  } catch (error) {
    responseError(res, 400, "failed to get user length", error);
  }
};

export const getUserStatistics = async (req, res) => {
  try {
    const usersCountPerDay = await userStatistics();
    const statistic = usersCountPerDay.map(({ date, usercreated }) => ({
      date: new Date(date).toLocaleDateString(),
      user_created: parseInt(usercreated),
    }));

    responseSuccess(
      res,
      200,
      "successfully get user statistic data",
      statistic
    );
  } catch (error) {
    responseError(res, 400, "failed to get user statistic", error);
  }
};
