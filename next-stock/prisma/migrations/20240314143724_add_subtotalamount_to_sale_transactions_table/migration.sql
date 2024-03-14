/*
  Warnings:

  - Added the required column `subTotalAmount` to the `sale_transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sale_transactions" ADD COLUMN     "subTotalAmount" INTEGER NOT NULL;
