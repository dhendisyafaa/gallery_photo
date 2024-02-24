-- DropForeignKey
ALTER TABLE "ImagesOnAlbums" DROP CONSTRAINT "ImagesOnAlbums_album_id_fkey";

-- DropForeignKey
ALTER TABLE "ImagesOnAlbums" DROP CONSTRAINT "ImagesOnAlbums_image_id_fkey";

-- AddForeignKey
ALTER TABLE "ImagesOnAlbums" ADD CONSTRAINT "ImagesOnAlbums_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesOnAlbums" ADD CONSTRAINT "ImagesOnAlbums_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
