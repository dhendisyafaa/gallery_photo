import prisma from "../db/db.js";

// export const findAllLikes = async () => {
//   return await prisma.like.findMany();
// };

export const findLikeByUser = async (user_id) => {
  const images = await prisma.like.findMany({
    where: {
      user_id,
    },
    include: {
      image: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  return images.map((image) => ({
    ...image.image,
    image_id: image.image_id,
    owner: image.user,
  }));
};

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
