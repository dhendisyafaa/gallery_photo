-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_album_id_fkey";

-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "album_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;
