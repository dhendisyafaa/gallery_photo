import {
  findAllImages,
  findImageById,
  findTrendingImages,
  findTrendingImagesByAlbum,
  insertImage,
  removeImage,
  updateImageData,
} from "../services/image.service.js";
import { responseError, responseSuccess } from "../utils/response.js";

export const getAllImages = async (req, res) => {
  try {
    const images = await findAllImages();
    responseSuccess(res, 200, "successfully get image data", images);
  } catch (error) {
    responseError(res, 400, "failed to get image", error);
  }
};

export const getTrendingImages = async (req, res) => {
  try {
    const images = await findTrendingImages();
    responseSuccess(res, 200, "successfully get image data", images);
  } catch (error) {
    console.log("🚀 ~ getTrendingImages ~ error:", error);
    responseError(res, 400, "failed to get image", error);
  }
};

export const getTrendingImagesByAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const images = await findTrendingImagesByAlbum(parseInt(id));
    responseSuccess(res, 200, "successfully get image data", images);
  } catch (error) {
    console.log("🚀 ~ getTrendingImages ~ error:", error);
    responseError(res, 400, "failed to get image", error);
  }
};

export const getImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await findImageById(parseInt(id));
    if (!image) {
      return res.status(404).json({
        error: "data not found",
        message: `image with id ${id} not found`,
        data: null,
      });
    }
    responseSuccess(res, 200, "successfully get image data", image);
  } catch (error) {
    responseError(res, 400, "failed to get image", error);
  }
};

export const uploadImage = async (req, res) => {
  try {
    const dataImage = {
      body: req.body,
      file: req.file,
    };

    await insertImage(dataImage);
    responseSuccess(res, 201, "successfully post image data");
  } catch (error) {
    responseError(res, 400, "failed to post image", error);
  }
};

export const updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { image_description, album_id, user_id } = req.body;

    const checkImage = await findImageById(parseInt(id));
    if (!checkImage) {
      return res.status(404).json({
        message: `image with id ${id} not found`,
        data: null,
      });
    }

    const dataImage = {
      image_description,
      album_id: parseInt(album_id),
      user_id,
    };

    const image = await updateImageData(parseInt(id), dataImage);
    responseSuccess(res, 200, "successfully update image data", image);
  } catch (error) {
    responseError(res, 400, "failed to update image", error);
  }
};

export const deleteImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await findImageById(parseInt(id));
    if (!image) {
      return res.status(404).json({
        message: `image with id ${id} not found`,
        data: null,
      });
    }
    await removeImage(parseInt(id));
    responseSuccess(res, 200, "successfully delete image data");
  } catch (error) {
    responseError(res, 400, "failed to delete image", error);
  }
};
