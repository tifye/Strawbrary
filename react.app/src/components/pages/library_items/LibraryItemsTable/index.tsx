import { Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LibraryItem } from '../../../../types';
import LibraryItemsTableHead from './LibraryItemsTableHead';
// import data from '../../../../__mock_data__/items.json';
import LibraryItemsTableRow from './LibraryItemsTableRow';
import { LibraryItemsStore } from '../../../../remote_access/';

export default function LibraryItemsTable() {
  const libraryItemsStore = useRef(new LibraryItemsStore());
  const [data, setData] = useState<LibraryItem[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(10);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    libraryItemsStore.current.getLibraryItems({
      page: page + 1,
      limit: rowsPerPage,
      total,
      lastPage: 0,
    }).then((paginationData) => {
      setData(paginationData.data);
      setPage(paginationData.page - 1);
      setTotal(paginationData.total);
      setRowsPerPage(paginationData.limit);     
    });
  }, [page, rowsPerPage]);

  const handlePageChange = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: any) => {
    setRowsPerPage(Number(event.target.value));
  };

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
      <TablePagination
        component="section"
        rowsPerPageOptions={[2, 20, 50]}
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Paper>
  );
}
