import prisma from "../db/db.js";

export const findAllImages = async () => {
  return await prisma.image.findMany({
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
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
          user: {
            select: {
              id: true,
              username: true,
            },
          },
          id: true,
          comment: true,
        },
      },
      like: {
        select: {
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
};

export const insertImage = async (data) => {
  return await prisma.image.create({
    data,
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
