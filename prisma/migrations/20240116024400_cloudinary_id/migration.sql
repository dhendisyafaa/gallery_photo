/*
  Warnings:

  - Added the required column `cloudinary_id` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "cloudinary_id" TEXT NOT NULL,
ALTER COLUMN "image_description" DROP NOT NULL;
