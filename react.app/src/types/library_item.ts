export interface LibraryItem {
  id: number;
  title: string;
  author?: string | null;
  pages?: number | null;
  runTimeMinutes?: number | null;
  isBorrowable: boolean;
  borrower?: string | null;
  borrowDate?: Date | null;
  type: string;
  categoryId: number;
}