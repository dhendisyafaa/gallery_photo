import prisma from "../db/db.js";

export const findAllComments = async () => {
  return await prisma.comment.findMany();
};

export const findCommentByImageId = async (id) => {
  return await prisma.comment.findMany({
    where: {
      image: {
        id,
      },
    },
  });
};

export const findCommentById = async (id) => {
  return await prisma.comment.findUnique({
    where: {
      id,
    },
  });
};

export const insertComment = async (data) => {
  return await prisma.comment.create({
    data,
  });
};

export const updateCommentData = async (id, data) => {
  return await prisma.comment.update({
    data,
    where: {
      id,
    },
  });
};

export const removeComment = async (id) => {
  return await prisma.comment.delete({
    where: {
      id,
    },
  });
};
