/*
  Warnings:

  - Changed the type of `currency` on the `Wallet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('EUR', 'BYN', 'PLN', 'USD', 'CUP');

-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "currency",
ADD COLUMN     "currency" "Currency" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_ownerId_currency_key" ON "Wallet"("ownerId", "currency");
