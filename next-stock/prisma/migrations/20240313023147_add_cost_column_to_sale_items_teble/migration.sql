/*
  Warnings:

  - Added the required column `cost` to the `sale_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sale_item" ADD COLUMN     "cost" INTEGER NOT NULL;
