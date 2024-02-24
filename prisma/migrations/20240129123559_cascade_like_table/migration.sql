-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_image_id_fkey";

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
