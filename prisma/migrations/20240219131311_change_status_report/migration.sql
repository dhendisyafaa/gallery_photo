/*
  Warnings:

  - The values [processing] on the enum `StatusReport` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusReport_new" AS ENUM ('pending', 'closed', 'deleted');
ALTER TABLE "ReportIssue" ALTER COLUMN "status_report" DROP DEFAULT;
ALTER TABLE "ReportIssue" ALTER COLUMN "status_report" TYPE "StatusReport_new" USING ("status_report"::text::"StatusReport_new");
ALTER TYPE "StatusReport" RENAME TO "StatusReport_old";
ALTER TYPE "StatusReport_new" RENAME TO "StatusReport";
DROP TYPE "StatusReport_old";
ALTER TABLE "ReportIssue" ALTER COLUMN "status_report" SET DEFAULT 'pending';
COMMIT;

-- AlterTable
ALTER TABLE "ReportIssue" ALTER COLUMN "status_report" SET DEFAULT 'pending';
