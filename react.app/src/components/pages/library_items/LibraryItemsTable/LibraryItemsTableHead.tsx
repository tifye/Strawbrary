import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

interface HeadCell {
  id: string;
  label: string;
  alignment?: 'left' | 'center' | 'right';
}

const headCells: HeadCell[] = [
  {
    id: 'id',
    label: 'Item ID',
    alignment: 'left',
  },
  {
    id: 'title',
    label: 'Title',
    alignment: 'left',
  },
  {
    id: 'category',
    label: 'Category',
    alignment: 'left',
  },
  {
    id: 'type',
    label: 'Type',
    alignment: 'left',
  },
  {
    id: 'borrowable',
    label: 'Availability',
    alignment: 'left',
  },
  {
    id: 'action',
    label: 'Actions',
    alignment: 'right',
  },
];

export default function LibraryItemsTableHead() {
  return (
    <>
      <TableHead>
        <TableRow key="header">
          {headCells.map((headCell) => (
            <TableCell key={headCell.id} align={headCell.alignment}>
              {headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    </>
  );
}
