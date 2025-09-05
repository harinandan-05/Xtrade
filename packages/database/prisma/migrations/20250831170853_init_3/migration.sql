/*
  Warnings:

  - A unique constraint covering the columns `[userId,symbol]` on the table `Position` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Position_symbol_key";

-- DropIndex
DROP INDEX "public"."Position_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Position_userId_symbol_key" ON "public"."Position"("userId", "symbol");
