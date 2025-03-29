/*
  Warnings:

  - A unique constraint covering the columns `[crmUserId]` on the table `Crm` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Crm_crmUserId_key" ON "Crm"("crmUserId");
