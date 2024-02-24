/*
  Warnings:

  - The values [prosessing] on the enum `StatusReport` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Album` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusReport_new" AS ENUM ('processing', 'closed');
ALTER TABLE "ReportIssue" ALTER COLUMN "status_report" DROP DEFAULT;
ALTER TABLE "ReportIssue" ALTER COLUMN "status_report" TYPE "StatusReport_new" USING ("status_report"::text::"StatusReport_new");
ALTER TYPE "StatusReport" RENAME TO "StatusReport_old";
ALTER TYPE "StatusReport_new" RENAME TO "StatusReport";
DROP TYPE "StatusReport_old";
ALTER TABLE "ReportIssue" ALTER COLUMN "status_report" SET DEFAULT 'processing';
COMMIT;

-- AlterTable
ALTER TABLE "ReportIssue" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "status_report" SET DEFAULT 'processing';

-- AlterTable
ALTER TABLE "ResponseReport" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Album_id_key" ON "Album"("id");
