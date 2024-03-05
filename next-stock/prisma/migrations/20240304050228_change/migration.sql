/*
  Warnings:

  - You are about to drop the column `unit` on the `stocks` table. All the data in the column will be lost.
  - You are about to drop the `product_stocks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `asset` to the `stocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `stocks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product_stocks" DROP CONSTRAINT "product_stocks_productId_fkey";

-- DropForeignKey
ALTER TABLE "product_stocks" DROP CONSTRAINT "product_stocks_stockId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_organization_id_fkey";

-- AlterTable
ALTER TABLE "stocks" DROP COLUMN "unit",
ADD COLUMN     "asset" INTEGER NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL;

-- DropTable
DROP TABLE "product_stocks";

-- DropTable
DROP TABLE "products";
