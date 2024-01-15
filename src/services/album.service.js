import prisma from "../db/db.js";

export const findAllAlbums = async () => {
  return await prisma.album.findMany({
    include: {
      owner: {
        select: {
          username: true,
        },
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
      image: true,
      owner: true,
    },
  });
};

export const insertAlbum = async (data) => {
  return await prisma.album.create({
    data,
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
