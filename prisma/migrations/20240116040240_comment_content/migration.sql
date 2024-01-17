/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `comment` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Image` table. All the data in the column will be lost.
  - Added the required column `owner_id` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment_content` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_user_id_fkey";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "ownerId",
ADD COLUMN     "owner_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "comment",
ADD COLUMN     "comment_content" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "user_id",
ADD COLUMN     "owner_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
