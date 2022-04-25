import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LibraryItem } from '../../../../types';
import LibraryItemsTableHead from './LibraryItemsTableHead';
// import data from '../../../../__mock_data__/items.json';
import LibraryItemsTableRow from './LibraryItemsTableRow';
import { LibraryItemsStore } from '../../../../remote_access/';

export default function LibraryItemsTable() {
  const libraryItemsStore = useRef(new LibraryItemsStore());
  const [data, setData] = useState<LibraryItem[]>([]);

  const fetchData = useCallback(async () => {
    const paginationData = await libraryItemsStore.current.getLibraryItems();
    setData(paginationData.data);
  }, []);

  useEffect(() => {
    fetchData()
      .catch(console.error);
  }, []);
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
