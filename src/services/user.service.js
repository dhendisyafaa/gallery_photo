import cloudinary from "../configs/cloudinary.js";
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
  const user = await prisma.user.findUnique({
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
    },
  });

  const manipulateLinks = user.links.map((link) => {
    return { value: link };
  });

  return { ...user, links: manipulateLinks };
};

export const findUserById = async (id) => {
  const user = await prisma.user.findUnique({
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
    },
  });

  const manipulateLinks = user.links.map((link) => {
    return { value: link };
  });

  return { ...user, links: manipulateLinks };
};

export const changeAvatarUser = async (id, file) => {
  const upload = await uploadImageToCloudinary(file, "radsnaps/avatar");

  return await prisma.user.update({
    data: {
      avatar: upload.secure_url,
      cloudinary_id: upload.public_id,
    },
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
