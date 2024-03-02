import {
  findLikeByImage,
  findLikeByUser,
  insertLike,
  removeLike,
} from "../services/like.service.js";
import { responseError, responseSuccess } from "../utils/response.js";

// export const getAllLikes = async (req, res) => {
//   try {
//     const likes = await findAllLikes();
//     responseSuccess(res, 200, "successfully get like data", likes);
//   } catch (error) {
//     responseError(res, 400, "failed to get like", error);
//   }
// };

export const getLikeByUser = async (req, res) => {
  try {
    const { user_id } = req.query;
    const likes = await findLikeByUser(user_id);
    responseSuccess(
      res,
      200,
      `successfully get like user ${user_id} data`,
      likes
    );
  } catch (error) {
    responseError(res, 400, "failed to get like", error);
  }
};

export const getLikeByImageId = async (req, res) => {
  try {
    const { id } = req.params;
    const likes = await findLikeByImage(parseInt(id));
    responseSuccess(res, 200, "successfully get like data", likes);
  } catch (error) {
    responseError(res, 400, "failed to get like", error);
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
    responseSuccess(res, 201, "successfully create like data");
  } catch (error) {
    responseError(res, 400, "failed to create like", error);
  }
};

export const deleteLikeById = async (req, res) => {
  try {
    const { id } = req.params;
    await removeLike(parseInt(id));
    responseSuccess(res, 200, "successfully delete like data");
  } catch (error) {
    responseError(res, 400, "failed to delete like", error);
  }
};
