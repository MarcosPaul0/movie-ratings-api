/*
  Warnings:

  - A unique constraint covering the columns `[movie_id,user_id]` on the table `ratings` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ratings" ALTER COLUMN "updated_at" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "ratings_movie_id_user_id_key" ON "ratings"("movie_id", "user_id");
