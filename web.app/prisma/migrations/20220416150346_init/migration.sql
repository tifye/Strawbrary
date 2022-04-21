-- CreateTable
CREATE TABLE "LibraryItem" (
    "Id" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "Author" TEXT NOT NULL,
    "Pages" INTEGER,
    "RunTimeMinutes" INTEGER,
    "IsBorrowable" BOOLEAN NOT NULL DEFAULT true,
    "Borrower" TEXT,
    "BorrowDate" TIMESTAMP(3),
    "Type" TEXT NOT NULL,
    "CategoryId" INTEGER NOT NULL,

    CONSTRAINT "LibraryItem_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Category" (
    "Id" SERIAL NOT NULL,
    "CategoryName" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "LibraryItem" ADD CONSTRAINT "LibraryItem_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "Category"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
