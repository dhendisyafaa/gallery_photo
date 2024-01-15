import prisma from "../db/db.js";

export const findAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      fullname: true,
      username: true,
      email: true,
    },
  });
};

export const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      album: true,
      image: true,
      comment: true,
      like: true,
    },
  });
};

export const updateUserData = async (id, data) => {
  return await prisma.user.update({
    data,
    where: {
      id,
    },
  });
};

export const removeUser = async (id) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};
