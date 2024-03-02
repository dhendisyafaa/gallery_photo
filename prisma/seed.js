import prisma from "../src/db/db.js";
import dotenv from "dotenv";
import { encript } from "../src/utils/brycpt.js";
dotenv.config();

async function main() {
  const hash = encript(process.env.ADMIN_PASSWORD);
  const admin = await prisma.user.create({
    data: {
      fullname: "Radsnaps",
      username: "radsnaps",
      password: hash,
      email: process.env.ADMIN_EMAIL,
      avatar: process.env.ADMIN_AVATAR,
      cloudinary_id: process.env.ADMIN_CLOUDINARY_ID,
      bio: "Framing the World's Wonders in Every Snap",
      links: [process.env.ADMIN_LINKS],
      role: "ADMIN",
    },
  });

  const seedAlbum = await prisma.album.create({
    data: {
      id: 1,
      album_name: "Newest",
      description: "Newest",
      owner_id: admin.id,
      album_cover:
        "https://res.cloudinary.com/dzr7oxnow/image/upload/v1709374002/radsnaps/cover_album/newest-album_tp5e3k.jpg",
      cloudinary_id: "radsnaps/cover_album/newest-album_tp5e3k",
      tags: ["latest photo", "latest"],
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
