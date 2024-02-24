import {
  findAllComments,
  findCommentById,
  findCommentByImageId,
  insertComment,
  removeComment,
  updateCommentData,
} from "../services/comment.service.js";
import { responseError, responseSuccess } from "../utils/response.js";

export const getAllComments = async (req, res) => {
  try {
    const comments = await findAllComments();
    responseSuccess(res, 200, "successfully get comment data", comments);
  } catch (error) {
    responseError(res, 400, "failed to get comment", error);
  }
};

export const getCommentByImageId = async (req, res) => {
  try {
    // FIX get data image by id before get comment by id image
    const { id } = req.params;
    const comments = await findCommentByImageId(parseInt(id), req.query);
    responseSuccess(res, 200, "successfully get comment data", comments);
  } catch (error) {
    console.log("🚀 ~ getCommentByImageId ~ error:", error);
    responseError(res, 400, "failed to get comment", error);
  }
};

export const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await findCommentById(parseInt(id));
    if (!comment) {
      return res.status(404).json({
        message: `comment with id ${id} not found`,
        data: null,
      });
    }
    responseSuccess(res, 200, "successfully get comment data", comment);
  } catch (error) {
    responseError(res, 400, "failed to get comment", error);
  }
};

export const createComment = async (req, res) => {
  try {
    const { comment_content, image_id, user_id } = req.body;

    const dataComment = {
      comment_content,
      image_id: parseInt(image_id),
      user_id,
    };

    await insertComment(dataComment);
    responseSuccess(
      res,
      201,
      "successfully create comment data",
      comment_content
    );
  } catch (error) {
    console.log("🚀 ~ createComment ~ error:", error);
    responseError(res, 400, "failed to create comment", error);
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, image_id, user_id } = req.body;

    const checkComment = await findCommentById(parseInt(id));
    if (!checkComment) {
      return res.status(404).json({
        message: `comment with id ${id} not found`,
        data: null,
      });
    }

    const dataComment = {
      comment,
      image_id: parseInt(image_id),
      user_id,
    };

    const res = await updateCommentData(parseInt(id), dataComment);
    responseSuccess(res, 200, "successfully update comment data");
  } catch (error) {
    responseError(res, 400, "failed to update comment", error);
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await findCommentById(parseInt(id));
    if (!comment) {
      return res.status(404).json({
        error: "data not found",
        message: `comment with id ${id} not found`,
        data: null,
      });
    }
    await removeComment(parseInt(id));
    responseSuccess(res, 200, "successfully delete comment data");
  } catch (error) {
    responseError(res, 400, "failed to delete comment", error);
  }
};
