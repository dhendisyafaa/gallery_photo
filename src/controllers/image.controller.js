import {
  findAllImages,
  findImageById,
  findImageByUser,
  findImagesByAlbum,
  findImagesBySearch,
  findImagesLength,
  findTrendingImages,
  findTrendingImagesByAlbum,
  insertImage,
  insertImageToAlbum,
  removeImage,
  removeImageInAlbum,
  updateImageData,
} from "../services/image.service.js";
import { responseError, responseSuccess } from "../utils/response.js";

export const getImagesLength = async (req, res) => {
  try {
    const images = await findImagesLength();
    responseSuccess(res, 200, "successfully get image length data", images);
  } catch (error) {
    console.log("🚀 ~ getAllImages ~ error:", error);
    responseError(res, 400, "failed to get all image length", error);
  }
};

export const getAllImages = async (req, res) => {
  try {
    const query = req.query;
    const images = await findAllImages(query.filter);
    responseSuccess(res, 200, "successfully get image data", images);
  } catch (error) {
    console.log("🚀 ~ getAllImages ~ error:", error);
    responseError(res, 400, "failed to get all image", error);
  }
};

export const getTrendingImages = async (req, res) => {
  try {
    const images = await findTrendingImages();
    responseSuccess(res, 200, "successfully get image data", images);
  } catch (error) {
    console.log("🚀 ~ getTrendingImages ~ error:", error);
    responseError(res, 400, "failed to get all image trending", error);
  }
};

export const getImagesByAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const imagesOnAlbums = await findImagesByAlbum(parseInt(id));
    responseSuccess(
      res,
      200,
      `successfully get image data on album ${id}`,
      imagesOnAlbums
    );
  } catch (error) {
    responseError(res, 400, `failed to get image by album ${id}`, error);
  }
};

export const getTrendingImagesByAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const images = await findTrendingImagesByAlbum(parseInt(id));
    responseSuccess(res, 200, "successfully get image data", images);
  } catch (error) {
    responseError(res, 400, "failed to get trending image by album", error);
  }
};

export const getImageByUser = async (req, res) => {
  try {
    const { user_id } = req.query;
    const image = await findImageByUser(user_id);
    if (!image) {
      return res.status(404).json({
        error: "data not found",
        message: `image with user ${user_id} not found`,
        data: null,
      });
    }
    responseSuccess(res, 200, "successfully get image data", image);
  } catch (error) {
    console.log("🚀 ~ getImageByUser ~ error:", error);
    responseError(res, 400, `failed to get image user`, error);
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
    console.log("🚀 ~ getImageById ~ error:", error);
    responseError(res, 400, "failed to get detail image", error);
  }
};

export const uploadImage = async (req, res) => {
  try {
    const dataImage = {
      body: req.body,
      file: req.file,
    };

    const uploadedImage = await insertImage(dataImage);
    responseSuccess(res, 201, "successfully post image data", uploadedImage);
  } catch (error) {
    console.log("🚀 ~ uploadImage ~ error:", error);
    responseError(res, 400, "failed to post image", error);
  }
};

export const addImageToAlbum = async (req, res) => {
  try {
    const { album_id, image_id } = req.body;

    const dataImageToAlbum = {
      album_id: parseInt(album_id),
      image_id: parseInt(image_id),
    };

    await insertImageToAlbum(dataImageToAlbum);
    responseSuccess(res, 201, "successfully post image data");
  } catch (error) {
    console.log("🚀 ~ uploadImage ~ error:", error);
    responseError(res, 400, "failed to post image", error);
  }
};

export const deleteImageInAlbum = async (req, res) => {
  try {
    const { album_id, image_id } = req.query;

    const dataImageAlbum = {
      album_id: parseInt(album_id),
      image_id: parseInt(image_id),
    };

    await removeImageInAlbum(dataImageAlbum);
    responseSuccess(res, 201, "successfully delete image in album");
  } catch (error) {
    console.log("🚀 ~ uploadImage ~ error:", error);
    responseError(res, 400, "failed to delete image in album", error);
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
    console.log("🚀 ~ deleteImageById ~ error:", error);
    responseError(res, 400, "failed to delete image", error);
  }
};

export const getImagesBySearch = async (req, res) => {
  try {
    const { q } = req.query;
    const images = await findImagesBySearch(q);
    responseSuccess(res, 200, "successfully get image data", images);
  } catch (error) {
    responseError(res, 400, "failed to get image by search", error);
  }
};
