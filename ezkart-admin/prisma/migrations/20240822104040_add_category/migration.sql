/*
  Warnings:

  - You are about to drop the column `billoardId` on the `Category` table. All the data in the column will be lost.
  - Added the required column `billboardId` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_billoardId_fkey";

-- DropIndex
DROP INDEX "Category_billoardId_idx";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "billoardId",
ADD COLUMN     "billboardId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Category_billboardId_idx" ON "Category"("billboardId");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_billboardId_fkey" FOREIGN KEY ("billboardId") REFERENCES "Billboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
