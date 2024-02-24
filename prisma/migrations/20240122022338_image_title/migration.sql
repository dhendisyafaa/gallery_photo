/*
  Warnings:

  - You are about to drop the column `upload_date` on the `Image` table. All the data in the column will be lost.
  - Added the required column `bytes` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `folder` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `format` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_title` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `original_filename` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resource_type` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "upload_date",
ADD COLUMN     "bytes" INTEGER NOT NULL,
ADD COLUMN     "created_at" TEXT NOT NULL,
ADD COLUMN     "folder" TEXT NOT NULL,
ADD COLUMN     "format" TEXT NOT NULL,
ADD COLUMN     "height" INTEGER NOT NULL,
ADD COLUMN     "image_title" TEXT NOT NULL,
ADD COLUMN     "original_filename" TEXT NOT NULL,
ADD COLUMN     "resource_type" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "width" INTEGER NOT NULL;
