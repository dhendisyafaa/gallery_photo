import prisma from "../db/db.js";

export const register = async (data) => {
  return await prisma.user.create({
    data,
  });
};
