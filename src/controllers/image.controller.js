import {
  findAllImages,
  findImageById,
  insertImage,
  removeImage,
  updateImageData,
} from "../services/image.service.js";

export const getAllImages = async (req, res) => {
  try {
    const images = await findAllImages();
    res.status(200).json({ success: true, data: images });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await findImageById(parseInt(id));
    res.status(200).json({ success: true, data: image });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const uploadImage = async (req, res) => {
  try {
    const { image_name, image_description, image_url, album_id, user_id } =
      req.body;

    const dataImage = {
      image_name,
      image_description,
      image_url,
      album_id: parseInt(album_id),
      user_id,
    };

    await insertImage(dataImage);
    res.status(200).json({ success: true, message: "Image created!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { image_description, album_id, user_id } = req.body;

    const dataImage = {
      image_description,
      album_id: parseInt(album_id),
      user_id,
    };
    const image = await updateImageData(parseInt(id), dataImage);
    res.status(200).json({ success: true, data: image });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteImageById = async (req, res) => {
  try {
    const { id } = req.params;
    await removeImage(parseInt(id));
    res.status(200).json({ success: true, message: "Image deleted!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
