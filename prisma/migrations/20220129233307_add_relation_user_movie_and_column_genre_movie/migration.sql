/*
  Warnings:

  - Added the required column `genre` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `favorite_movie` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movies" ADD COLUMN     "genre" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "favorite_movie" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_favorite_movie_fkey" FOREIGN KEY ("favorite_movie") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
