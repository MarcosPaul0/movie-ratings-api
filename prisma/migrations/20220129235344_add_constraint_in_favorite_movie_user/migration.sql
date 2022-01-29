-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_favorite_movie_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "favorite_movie" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_favorite_movie_fkey" FOREIGN KEY ("favorite_movie") REFERENCES "movies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
