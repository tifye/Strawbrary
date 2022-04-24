import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import React from 'react';
import { LibraryItem } from '../../../../types';
import LibraryItemsTableHead from './LibraryItemsTableHead';
import data from './__mock_data__.json';
import LibraryItemsTableRow from './LibraryItemsTableRow';

export default function LibraryItemsTable() {
  return (
    <Paper elevation={1}>
      <TableContainer>
        <Table stickyHeader aria-label="items table" style={{ marginTop: 4 }}>
          <LibraryItemsTableHead />
          <TableBody>
            {(data as LibraryItem[]).map((item) => (
              <LibraryItemsTableRow
                key={item.id}
                item={item}
                selected={false}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
