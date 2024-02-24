/*
  Warnings:

  - You are about to drop the column `status_resport` on the `ReportIssue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ResponseReport" DROP CONSTRAINT "ResponseReport_report_id_fkey";

-- AlterTable
ALTER TABLE "ReportIssue" DROP COLUMN "status_resport",
ADD COLUMN     "status_report" "StatusReport" NOT NULL DEFAULT 'prosessing';

-- AddForeignKey
ALTER TABLE "ResponseReport" ADD CONSTRAINT "ResponseReport_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "ReportIssue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
