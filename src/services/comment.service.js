import prisma from "../db/db.js";

export const findAllComments = async () => {
  return await prisma.comment.findMany();
};

export const findCommentByImageId = async (id, query) => {
  // const limit = parseInt(query.limit);
  // const cursor = query.cursor ?? "";
  // const cursorObj = cursor === "" ? undefined : { id: parseInt(cursor) };

  return await prisma.comment.findMany({
    where: {
      image: {
        id,
      },
    },
    include: {
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
    // skip: cursor !== "" ? 1 : 0,
    // cursor: cursorObj,
    // take: limit,
  });

  // return {
  //   comments,
  //   nextId: comments.length === limit ? comments[limit - 1].id : undefined,
  // };
};

export const findCommentById = async (id) => {
  return await prisma.comment.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
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
