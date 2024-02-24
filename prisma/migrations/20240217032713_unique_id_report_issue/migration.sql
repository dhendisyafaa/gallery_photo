/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `ReportIssue` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ReportIssue_id_key" ON "ReportIssue"("id");
