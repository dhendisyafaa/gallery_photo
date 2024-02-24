/*
  Warnings:

  - A unique constraint covering the columns `[owner_id]` on the table `Album` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[owner_id]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Album_owner_id_key" ON "Album"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_user_id_key" ON "Comment"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Image_owner_id_key" ON "Image"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Like_user_id_key" ON "Like"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
