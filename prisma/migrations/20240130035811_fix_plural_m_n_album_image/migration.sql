/*
  Warnings:

  - You are about to drop the column `album_id` on the `Image` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_album_id_fkey";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "album_id";

-- CreateTable
CREATE TABLE "_AlbumToImage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AlbumToImage_AB_unique" ON "_AlbumToImage"("A", "B");

-- CreateIndex
CREATE INDEX "_AlbumToImage_B_index" ON "_AlbumToImage"("B");

-- AddForeignKey
ALTER TABLE "_AlbumToImage" ADD CONSTRAINT "_AlbumToImage_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumToImage" ADD CONSTRAINT "_AlbumToImage_B_fkey" FOREIGN KEY ("B") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
