-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_image_id_fkey";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
