import { register } from "../services/auth.service.js";

export const registerUser = async (req, res) => {
  try {
    const user = await register(req.body);
    res.status(200).json({ success: true, message: "User created!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
