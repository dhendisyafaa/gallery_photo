import {
  findAllComments,
  findCommentById,
  insertComment,
  removeComment,
  updateCommentData,
} from "../services/comment.service.js";

export const getAllComments = async (req, res) => {
  try {
    const comments = await findAllComments();
    res.status(200).json({ success: true, data: comments });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await findCommentById(parseInt(id));
    res.status(200).json({ success: true, data: comment });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const createComment = async (req, res) => {
  try {
    const { comment, image_id, user_id } = req.body;

    const dataComment = {
      comment,
      image_id: parseInt(image_id),
      user_id,
    };

    await insertComment(dataComment);
    res.status(200).json({ success: true, message: "Comment created!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, image_id, user_id } = req.body;

    const dataComment = {
      comment,
      image_id: parseInt(image_id),
      user_id,
    };

    const res = await updateCommentData(parseInt(id), dataComment);
    res.status(200).json({ success: true, data: res });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    await removeComment(parseInt(id));
    res.status(200).json({ success: true, message: "Comment deleted!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
