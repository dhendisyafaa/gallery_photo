import prisma from "../db/db.js";
import { uploadImageToCloudinary } from "./image.service.js";

export const findAlbumsLength = async () => {
  return await prisma.album.count();
};

export const findAllUserAlbums = async () => {
  return await prisma.album.findMany({
    where: {
      owner: {
        role: "USER",
      },
    },
    include: {
      images: true,
      owner: {
        select: { avatar: true, username: true },
      },
    },
  });
};

export const findAllOfficialAlbums = async () => {
  return await prisma.album.findMany({
    where: {
      owner: {
        role: "ADMIN",
      },
    },
    include: {
      images: true,
      owner: {
        select: { avatar: true, username: true },
      },
    },
  });
};

export const findAlbumById = async (id) => {
  return await prisma.album.findUnique({
    where: {
      id,
    },
    include: {
      owner: {
        select: {
          id: true,
          avatar: true,
          username: true,
        },
      },
    },
  });
};

export const findAlbumByUser = async (id) => {
  return await prisma.album.findMany({
    where: {
      owner_id: id,
    },
    include: {
      images: true,
      owner: true,
    },
  });
};

export const insertAlbum = async (data) => {
  const { album_name, description, owner_id, tags } = data.body;

  let upload;

  if (data.file) {
    upload = await uploadImageToCloudinary(data.file, "radsnaps/cover_album");
  }

  return await prisma.album.create({
    data: {
      album_name,
      description,
      owner_id,
      tags,
      album_cover: upload?.secure_url || "",
      cloudinary_id: upload?.public_id || "",
    },
  });
};

export const updateAlbumData = async (id, data) => {
  return await prisma.album.update({
    data,
    where: {
      id,
    },
  });
};

export const removeAlbum = async (id) => {
  return await prisma.album.delete({
    where: {
      id,
    },
  });
};

export const findAlbumsBySearch = async (q) => {
  const splitQuery = q.split(" ");
  return await prisma.album.findMany({
    include: {
      images: true,
      owner: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
    where: {
      OR: [
        {
          tags: {
            hasEvery: splitQuery,
          },
        },
        {
          album_name: {
            contains: q,
          },
        },
        {
          owner: {
            username: {
              contains: q,
            },
          },
        },
      ],
    },
  });
};
