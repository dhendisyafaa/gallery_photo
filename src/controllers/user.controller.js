import {
  findAllUsers,
  findUserById,
  removeUser,
  updateUserData,
} from "../services/user.service.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await findAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findUserById(id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await updateUserData(id, req.body);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await removeUser(id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
