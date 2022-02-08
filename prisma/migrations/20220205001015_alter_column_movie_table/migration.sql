/*
  Warnings:

  - You are about to drop the column `mean_rating` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `total_ratings` on the `movies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "movies" DROP COLUMN "mean_rating",
DROP COLUMN "total_ratings",
ADD COLUMN     "total_number_ratings" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_rating" DOUBLE PRECISION NOT NULL DEFAULT 0;
