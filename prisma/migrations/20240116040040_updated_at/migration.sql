/*
  Warnings:

  - Added the required column `updated_at` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
