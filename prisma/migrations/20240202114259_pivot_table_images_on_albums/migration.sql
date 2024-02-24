/*
  Warnings:

  - You are about to drop the `_AlbumToImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AlbumToImage" DROP CONSTRAINT "_AlbumToImage_A_fkey";

-- DropForeignKey
ALTER TABLE "_AlbumToImage" DROP CONSTRAINT "_AlbumToImage_B_fkey";

-- DropTable
DROP TABLE "_AlbumToImage";

-- CreateTable
CREATE TABLE "ImagesOnAlbums" (
    "album_id" INTEGER NOT NULL,
    "image_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImagesOnAlbums_pkey" PRIMARY KEY ("album_id","image_id")
);

-- AddForeignKey
ALTER TABLE "ImagesOnAlbums" ADD CONSTRAINT "ImagesOnAlbums_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesOnAlbums" ADD CONSTRAINT "ImagesOnAlbums_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
