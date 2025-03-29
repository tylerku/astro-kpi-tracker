/*
  Warnings:

  - Added the required column `crmUserId` to the `Crm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Crm" ADD COLUMN     "crmUserId" TEXT NOT NULL;
