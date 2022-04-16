/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CategoryName` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `Id` on the `Category` table. All the data in the column will be lost.
  - The primary key for the `LibraryItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Author` on the `LibraryItem` table. All the data in the column will be lost.
  - You are about to drop the column `BorrowDate` on the `LibraryItem` table. All the data in the column will be lost.
  - You are about to drop the column `Borrower` on the `LibraryItem` table. All the data in the column will be lost.
  - You are about to drop the column `CategoryId` on the `LibraryItem` table. All the data in the column will be lost.
  - You are about to drop the column `Id` on the `LibraryItem` table. All the data in the column will be lost.
  - You are about to drop the column `IsBorrowable` on the `LibraryItem` table. All the data in the column will be lost.
  - You are about to drop the column `Pages` on the `LibraryItem` table. All the data in the column will be lost.
  - You are about to drop the column `RunTimeMinutes` on the `LibraryItem` table. All the data in the column will be lost.
  - You are about to drop the column `Title` on the `LibraryItem` table. All the data in the column will be lost.
  - You are about to drop the column `Type` on the `LibraryItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[categoryName]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryName` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author` to the `LibraryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `LibraryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `LibraryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `LibraryItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LibraryItem" DROP CONSTRAINT "LibraryItem_CategoryId_fkey";

-- DropIndex
DROP INDEX "Category_CategoryName_key";

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
DROP COLUMN "CategoryName",
DROP COLUMN "Id",
ADD COLUMN     "categoryName" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "LibraryItem" DROP CONSTRAINT "LibraryItem_pkey",
DROP COLUMN "Author",
DROP COLUMN "BorrowDate",
DROP COLUMN "Borrower",
DROP COLUMN "CategoryId",
DROP COLUMN "Id",
DROP COLUMN "IsBorrowable",
DROP COLUMN "Pages",
DROP COLUMN "RunTimeMinutes",
DROP COLUMN "Title",
DROP COLUMN "Type",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "borrowDate" TIMESTAMP(3),
ADD COLUMN     "borrower" TEXT,
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "isBorrowable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "pages" INTEGER,
ADD COLUMN     "runTimeMinutes" INTEGER,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD CONSTRAINT "LibraryItem_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_categoryName_key" ON "Category"("categoryName");

-- AddForeignKey
ALTER TABLE "LibraryItem" ADD CONSTRAINT "LibraryItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
