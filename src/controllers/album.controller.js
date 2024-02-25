import {
  findAlbumById,
  findAlbumByUser,
  findAlbumsBySearch,
  findAlbumsLength,
  findAllOfficialAlbums,
  findAllUserAlbums,
  insertAlbum,
  removeAlbum,
  updateAlbumData,
} from "../services/album.service.js";
import { responseError, responseSuccess } from "../utils/response.js";

export const getAlbumsLength = async (req, res) => {
  try {
    const albums = await findAlbumsLength();
    responseSuccess(res, 200, "successfully get album length data", albums);
  } catch (error) {
    responseError(res, 400, "failed to get album length", error);
  }
};

export const getAllUserAlbums = async (req, res) => {
  try {
    const albums = await findAllUserAlbums();
    responseSuccess(res, 200, "successfully get album data", albums);
  } catch (error) {
    responseError(res, 400, "failed to get album", error);
  }
};

export const getAllOfficialAlbums = async (req, res) => {
  try {
    const albums = await findAllOfficialAlbums();
    responseSuccess(res, 200, "successfully get album data", albums);
  } catch (error) {
    responseError(res, 400, "failed to get album", error);
  }
};

export const getAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    const album = await findAlbumById(parseInt(id));
    if (!album) {
      return res.status(404).json({
        error: "data not found",
        message: `album with id ${id} not found`,
        data: null,
      });
    }
    responseSuccess(res, 200, "successfully get album data", album);
  } catch (error) {
    console.log("🚀 ~ getAlbumById ~ error:", error);
    responseError(res, 400, "failed to get album", error);
  }
};

export const getAlbumByUser = async (req, res) => {
  try {
    const { user_id } = req.query;
    const album = await findAlbumByUser(user_id);
    responseSuccess(
      res,
      200,
      `successfully get album id ${user_id} data`,
      album
    );
  } catch (error) {
    console.log("🚀 ~ getAlbumByUser ~ error:", error);
    responseError(res, 400, `failed to get album user`, error);
  }
};

export const createAlbum = async (req, res) => {
  try {
    const { tags } = req.body;
    const tagsArray = tags.split(", ");

    const dataAlbum = {
      body: {
        ...req.body,
        tags: tagsArray,
      },
      file: req.file,
    };

    await insertAlbum(dataAlbum);
    responseSuccess(res, 201, "successfully create album data");
  } catch (error) {
    console.log("🚀 ~ createAlbum ~ error:", error);
    responseError(res, 400, "failed to create album", error);
  }
};

export const updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const { tags } = req.body;
    const checkAlbum = await findAlbumById(parseInt(id));
    if (!checkAlbum) {
      return res.status(404).json({
        message: `album with id ${id} not found`,
        data: null,
      });
    }

    const tagsArray = tags.split(", ");

    const album = await updateAlbumData(parseInt(id), {
      ...req.body,
      tags: tagsArray,
    });
    responseSuccess(res, 200, "successfully update album data", album);
  } catch (error) {
    console.log("🚀 ~ updateAlbum ~ error:", error);
    responseError(res, 400, "failed to update album", error);
  }
};

export const deleteAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    const album = await findAlbumById(parseInt(id));
    if (!album) {
      return res.status(404).json({
        message: `album with id ${id} not found`,
        data: null,
      });
    }
    await removeAlbum(parseInt(id));
    responseSuccess(res, 200, "successfully delete album data");
  } catch (error) {
    responseError(res, 400, "failed to delete album", error);
  }
};

export const getAlbumsBySearch = async (req, res) => {
  try {
    const { q } = req.query;
    const albums = await findAlbumsBySearch(q);
    responseSuccess(res, 200, `successfully get album search ${q}`, albums);
  } catch (error) {
    responseError(res, 400, "failed to get album by search", error);
  }
};
