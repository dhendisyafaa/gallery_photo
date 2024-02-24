import cloudinary from "../configs/cloudinary.js";
import prisma from "../db/db.js";

export const findAllImages = async (filter) => {
  const filterObj = {
    trending: {
      likes: {
        _count: "desc",
      },
    },
    newest: {
      created_at: "desc",
    },
    oldest: {
      created_at: "asc",
    },
  };

  return await prisma.image.findMany({
    include: {
      likes: true,
      owner: {
        select: {
          username: true,
        },
      },
    },
    orderBy: filterObj[filter],
  });

  // return likeImageLength(images);
};

export const findTrendingImages = async (id) => {
  const trendingImages = await prisma.image.findMany({
    take: 10,
    include: {
      likes: true,
      owner: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      likes: {
        _count: "desc",
      },
    },
  });

  return likeImageLength(trendingImages);
};

export const findImagesByAlbum = async (id) => {
  const images = await prisma.imagesOnAlbums.findMany({
    where: {
      album_id: id,
    },
    include: {
      image: {
        include: {
          likes: true,
          owner: {
            select: {
              id: true,
              avatar: true,
              username: true,
            },
          },
        },
      },
    },
  });

  return images.map((image) => ({ ...image.image }));
};

// export const findImagesByAlbum = async (id) => {
//   return await prisma.image.findMany({
//     where: {
//       albums: {},
//     },
//     include: {
//       likes: true,
//       owner: {
//         select: {
//           username: true,
//         },
//       },
//     },
//   });
// };

export const findTrendingImagesByAlbum = async (id) => {
  const trendingImagesByAlbum = await prisma.image.findMany({
    where: {
      album_id: id,
    },
    include: {
      likes: true,
      owner: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      likes: {
        _count: "desc",
      },
    },
  });

  return likeImageLength(trendingImagesByAlbum);
};

export const findImageByUser = async (id) => {
  return await prisma.image.findMany({
    where: {
      owner_id: id,
    },
    include: {
      likes: {
        select: {
          id: true,
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
      owner: {
        select: {
          id: true,
          username: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
};

export const findImageById = async (id) => {
  return await prisma.image.findUnique({
    where: {
      id,
    },
    include: {
      albums: true,
      comments: {
        select: {
          id: true,
          comment_content: true,
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
      likes: {
        select: {
          id: true,
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
      owner: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
  });
};

export const insertImage = async (data) => {
  const { image_description, image_title, album_id, owner_id, tags } =
    data.body;

  const upload = await uploadImageToCloudinary(data.file, "radsnaps/images");
  const tagsArray = tags.split(", ");

  return await prisma.image.create({
    data: {
      cloudinary_id: upload.public_id,
      image_url: upload.secure_url,
      image_name: data.file.filename,
      image_description,
      image_title,
      width: parseInt(upload.width),
      height: parseInt(upload.height),
      format: upload.format,
      resource_type: upload.resource_type,
      created_at: upload.created_at,
      tags: tagsArray,
      bytes: parseInt(upload.bytes),
      folder: upload.folder,
      original_filename: upload.original_filename,
      albums: {
        create: {
          album_id: parseInt(album_id),
        },
      },
      owner_id,
    },
  });
};

export const insertImageToAlbum = async (data) => {
  return await prisma.imagesOnAlbums.create({
    data,
  });
};

export const removeImageInAlbum = async (data) => {
  return await prisma.imagesOnAlbums.delete({
    where: {
      album_id_image_id: {
        album_id: data.album_id,
        image_id: data.image_id,
      },
    },
  });
};

export const uploadImageToCloudinary = async (file, folder) => {
  if (!file) {
    const err = new Error("please for upload image!");
    err.errStatus = 422;
    throw err;
  }

  return await cloudinary.uploader.upload(file.path, {
    folder,
  });
};

export const removeImageInCloudinary = async (cloudinary_id) => {
  return await cloudinary.uploader.destroy(cloudinary_id);
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

export const likeImageLength = (images) => {
  const convertLikeLength = images.map((image) => ({
    ...image,
    like: image.likes.length,
  }));

  return convertLikeLength;
};

export const findImagesBySearch = async (q) => {
  const splitQuery = q.split(" ");
  return await prisma.image.findMany({
    include: {
      likes: true,
      owner: {
        select: {
          username: true,
        },
      },
    },
    where: {
      OR: [
        {
          tags: {
            hasEvery: splitQuery,
          },
        },
        {
          image_title: {
            contains: q,
          },
        },
        {
          owner: {
            username: {
              contains: q,
            },
          },
        },
      ],
    },
  });
};
