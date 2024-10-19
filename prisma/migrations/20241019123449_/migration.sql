/*
  Warnings:

  - The `day` column on the `Data` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Data" DROP COLUMN "day",
ADD COLUMN     "day" TIMESTAMP(3);
