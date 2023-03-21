/*
  Warnings:

  - You are about to drop the column `flavors` on the `Collector` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Collector" DROP COLUMN "flavors",
ADD COLUMN     "teaser" TEXT;
