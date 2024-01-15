import {
  findAlbumById,
  findAllAlbums,
  insertAlbum,
  removeAlbum,
  updateAlbumData,
} from "../services/album.service.js";

export const getAllAlbums = async (req, res) => {
  try {
    const albums = await findAllAlbums();
    res.status(200).json({ success: true, data: albums });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    const album = await findAlbumById(parseInt(id));
    res.status(200).json({ success: true, data: album });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const createAlbum = async (req, res) => {
  try {
    await insertAlbum(req.body);
    res.status(200).json({ success: true, message: "Album created!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const album = await updateAlbumData(parseInt(id), req.body);
    res.status(200).json({ success: true, data: album });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    await removeAlbum(parseInt(id));
    res.status(200).json({ success: true, message: "Album deleted!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
