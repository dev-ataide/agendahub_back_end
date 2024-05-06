/*
  Warnings:

  - You are about to drop the column `clienteId` on the `Pdf` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Pdf` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pdf" DROP CONSTRAINT "Pdf_clienteId_fkey";

-- AlterTable
ALTER TABLE "Pdf" DROP COLUMN "clienteId",
ADD COLUMN     "clientId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Pdf" ADD CONSTRAINT "Pdf_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
