-- DropForeignKey
ALTER TABLE "Crm" DROP CONSTRAINT "Crm_userId_fkey";

-- AlterTable
ALTER TABLE "Crm" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Crm" ADD CONSTRAINT "Crm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
