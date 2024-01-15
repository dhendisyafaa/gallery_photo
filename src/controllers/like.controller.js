import { findAllLikes, insertLike } from "../services/like.service.js";

export const getAllLikes = async (req, res) => {
  try {
    const likes = await findAllLikes();
    res.status(200).json({ success: true, data: likes });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const createLike = async (req, res) => {
  try {
    const { image_id, user_id } = req.body;

    const dataLike = {
      image_id: parseInt(image_id),
      user_id,
    };

    await insertLike(dataLike);
    res.status(200).json({ success: true, message: "Like created!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteLikeById = async (req, res) => {
  try {
    const { id } = req.params;
    await removeLike(parseInt(id));
    res.status(200).json({ success: true, message: "Like deleted!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
