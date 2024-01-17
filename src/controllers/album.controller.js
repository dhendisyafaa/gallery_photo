import {
  findAlbumById,
  findAllAlbums,
  insertAlbum,
  removeAlbum,
  updateAlbumData,
} from "../services/album.service.js";
import { responseError, responseSuccess } from "../utils/response.js";

export const getAllAlbums = async (req, res) => {
  try {
    const albums = await findAllAlbums();
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
    responseError(res, 400, "failed to get album", error);
  }
};

export const createAlbum = async (req, res) => {
  try {
    await insertAlbum(req.body);
    responseSuccess(res, 201, "successfully create album data");
  } catch (error) {
    responseError(res, 400, "failed to create album", error);
  }
};

export const updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const checkAlbum = await findAlbumById(parseInt(id));
    if (!checkAlbum) {
      return res.status(404).json({
        message: `album with id ${id} not found`,
        data: null,
      });
    }
    const album = await updateAlbumData(parseInt(id), req.body);
    responseSuccess(res, 200, "successfully update album data", album);
  } catch (error) {
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
