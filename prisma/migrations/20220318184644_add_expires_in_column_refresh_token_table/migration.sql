/*
  Warnings:

  - Added the required column `expires_in` to the `refresh_token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "refresh_token" ADD COLUMN     "expires_in" INTEGER NOT NULL;
