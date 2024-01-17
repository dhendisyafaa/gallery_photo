import prisma from "../db/db.js";

export const register = async (data) => {
  return await prisma.user.create({
    data,
  });
};

export const login = async (email) => {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
};

export const checkingUsername = async (username) => {
  return await prisma.user.findUnique({
    where: {
      username,
    },
  });
};
