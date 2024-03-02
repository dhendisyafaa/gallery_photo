import { Prisma } from "@prisma/client";
import prisma from "../db/db.js";
import {
  removeImageInCloudinary,
  uploadImageToCloudinary,
} from "./image.service.js";

export const findAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      fullname: true,
      username: true,
      email: true,
      avatar: true,
    },
  });
};

export const findUserByUsername = async (username) => {
  return await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      fullname: true,
      username: true,
      email: true,
      avatar: true,
      cloudinary_id: true,
      bio: true,
      links: true,
      role: true,
    },
  });
};

export const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      fullname: true,
      username: true,
      email: true,
      avatar: true,
      cloudinary_id: true,
      bio: true,
      links: true,
      role: true,
    },
  });
};

export const findUserAvatar = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      avatar: true,
      cloudinary_id: true,
    },
  });
};

export const changeAvatarUser = async (id, data) => {
  return await prisma.user.update({
    data,
    where: {
      id,
    },
  });
};

export const removeAvatarUser = async (id, cloudinary_id) => {
  await removeImageInCloudinary(cloudinary_id);
  return await prisma.user.update({
    data: {
      avatar: null,
      cloudinary_id: null,
    },
    where: {
      id,
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

export const findUsersLength = async () => {
  return await prisma.user.count();
};

export const userStatistics = async () => {
  return await prisma.$queryRaw`
    SELECT
      DATE(created_at) AS date,
      COUNT(*)::int AS userCreated
    FROM
      "User"
    GROUP BY
      date
    ORDER BY
      date;
  `;
};
