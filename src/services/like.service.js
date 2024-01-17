import prisma from "../db/db.js";

// export const findAllLikes = async () => {
//   return await prisma.like.findMany();
// };

export const findLikeByImage = async (id) => {
  return await prisma.like.findMany({
    where: {
      image: {
        id,
      },
    },
  });
};

export const insertLike = async (data) => {
  return await prisma.like.create({
    data,
  });
};

export const removeLike = async (id) => {
  return await prisma.like.delete({
    where: {
      id,
    },
  });
};
