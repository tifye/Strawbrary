import { LibraryItem } from '@prisma/client';
import { UpdateBookDto } from 'src/library_items/dto/update_book.dto';
import { UpdateReferenceBookDto } from 'src/library_items/dto/update_reference_book.dto';
import { CreateBookDto } from '../library_items/dto/create_book.dto';

export const mock_updateReferenceBookDto: UpdateReferenceBookDto = {
  title: 'A Girl Has Her Thorns',
  author: 'Hisasi',
  pages: 214,
  categoryId: 1,
};

export const mock_referenceBook: LibraryItem = {
  id: 1,
  title: 'A Girl Has Her Thorns',
  author: 'Hisasi',
  pages: 214,
  runTimeMinutes: null,
  isBorrowable: false,
  borrower: null,
  borrowDate: null,
  type: 'ReferenceBook',
  categoryId: 1,
};

export const mock_updateBookDto: UpdateBookDto = {
  title: 'A Girl Has Her Thorns',
  author: 'Hisasi',
  pages: 214,
  categoryId: 1,
};

export const mock_bookDto: CreateBookDto = {
  title: 'A Girl Has Her Thorns',
  author: 'Hisasi',
  pages: 214,
  categoryId: 1,
};

export const mock_book: LibraryItem = {
  id: 1,
  title: 'A Girl Has Her Thorns',
  author: 'Hisasi',
  pages: 214,
  runTimeMinutes: null,
  isBorrowable: true,
  borrower: null,
  borrowDate: null,
  type: 'Book',
  categoryId: 1,
};

export const mock_libraryItems: LibraryItem[] = [
  {
    id: 1,
    title: 'After School Vanilla',
    author: 'Key',
    pages: 234,
    runTimeMinutes: null,
    isBorrowable: true,
    borrower: null,
    borrowDate: null,
    type: 'Book',
    categoryId: 1,
  },
  {
    id: 2,
    title: 'Metamorphosis',
    author: 'Shindo L',
    pages: 250,
    runTimeMinutes: null,
    isBorrowable: true,
    borrower: null,
    borrowDate: null,
    type: 'Book',
    categoryId: 1,
  },
  {
    id: 3,
    title: 'Monster Smash',
    author: 'Mizone',
    pages: 203,
    runTimeMinutes: null,
    isBorrowable: true,
    borrower: null,
    borrowDate: null,
    type: 'Book',
    categoryId: 1,
  },
  {
    id: 4,
    title: 'S&M Ecstasy',
    author: 'Michiking',
    pages: 240,
    runTimeMinutes: null,
    isBorrowable: true,
    borrower: null,
    borrowDate: null,
    type: 'Book',
    categoryId: 1,
  },
];
