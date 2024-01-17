import cloudinary from "../configs/cloudinary.js";
import prisma from "../db/db.js";

export const findAllImages = async () => {
  const images = await prisma.image.findMany({
    include: {
      like: true,
      owner: {
        select: {
          username: true,
        },
      },
    },
  });

  return likeImageLength(images);
};

export const findTrendingImages = async (id) => {
  const trendingImages = await prisma.image.findMany({
    take: 10,
    include: {
      like: true,
      owner: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      like: {
        _count: "desc",
      },
    },
  });

  return likeImageLength(trendingImages);
};

export const findTrendingImagesByAlbum = async (id) => {
  const trendingImagesByAlbum = await prisma.image.findMany({
    take: 10,
    where: {
      album_id: id,
    },
    include: {
      like: true,
      owner: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      like: {
        _count: "desc",
      },
    },
  });

  return likeImageLength(trendingImagesByAlbum);
};

export const findImageById = async (id) => {
  return await prisma.image.findUnique({
    where: {
      id,
    },
    include: {
      album: {
        select: {
          id: true,
          album_name: true,
        },
      },
      comment: {
        select: {
          id: true,
          comment_content: true,
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
      like: {
        select: {
          id: true,
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
      owner: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
};

export const insertImage = async (data) => {
  const { image_name, image_description, image_url, album_id, owner_id } =
    data.body;

  const upload = await uploadImageToCloudinary(data.file);

  return await prisma.image.create({
    data: {
      image_name: data.file.filename,
      image_description,
      image_url: upload.secure_url,
      cloudinary_id: upload.public_id,
      album_id: parseInt(album_id),
      owner_id,
    },
  });
};

export const uploadImageToCloudinary = async (file) => {
  if (!file) {
    const err = new Error("please for upload image!");
    err.errStatus = 422;
    throw err;
  }

  return await cloudinary.uploader.upload(file.path, {
    folder: "gallery_photo",
  });
};

export const updateImageData = async (id, data) => {
  return await prisma.image.update({
    data,
    where: {
      id,
    },
  });
};

export const removeImage = async (id) => {
  return await prisma.image.delete({
    where: {
      id,
    },
  });
};

export const likeImageLength = (images) => {
  const convertLikeLength = images.map((image) => ({
    ...image,
    like: image.like.length,
  }));

  return convertLikeLength;
};
