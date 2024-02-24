/*
  Warnings:

  - Made the column `updated_at` on table `ImagesOnAlbums` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('user', 'image', 'album', 'comment');

-- CreateEnum
CREATE TYPE "StatusReport" AS ENUM ('prosessing', 'closed');

-- AlterTable
ALTER TABLE "Album" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ImagesOnAlbums" ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "ReportIssue" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "content_id" TEXT NOT NULL,
    "content_type" "ContentType" NOT NULL,
    "issue" TEXT[],
    "report_message" TEXT NOT NULL,
    "status_resport" "StatusReport" NOT NULL DEFAULT 'prosessing',

    CONSTRAINT "ReportIssue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResponseReport" (
    "id" SERIAL NOT NULL,
    "admin_id" TEXT NOT NULL,
    "response_message" TEXT NOT NULL,
    "report_id" INTEGER NOT NULL,

    CONSTRAINT "ResponseReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResponseReport_report_id_key" ON "ResponseReport"("report_id");

-- AddForeignKey
ALTER TABLE "ResponseReport" ADD CONSTRAINT "ResponseReport_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "ReportIssue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
