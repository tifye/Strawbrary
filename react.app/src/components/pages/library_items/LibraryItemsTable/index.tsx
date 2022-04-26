import { Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { LibraryItem } from '../../../../types';
import LibraryItemsTableHead from './LibraryItemsTableHead';
import LibraryItemsTableRow from './LibraryItemsTableRow';
import { LibraryItemsStore } from '../../../../remote_access/';
import LibraryItemsContext from '../LibraryItemsContext';

export default function LibraryItemsTable() {
  const libraryItemsStore = useRef(new LibraryItemsStore());
  const [data, setData] = useState<LibraryItem[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const { searchText, orderBy, shouldUpdate } = useContext(LibraryItemsContext);

  useEffect(() => {
    libraryItemsStore.current.getLibraryItems({
      page: page + 1,
      perPage: rowsPerPage,
      search: searchText || undefined,
      orderDirection: 'desc',
      orderBy,
    }).then((paginationData) => {
      setData(paginationData.data);
      setPage(paginationData.page - 1);
      setTotal(paginationData.total);
      setRowsPerPage(paginationData.limit);     
    });
  }, [page, rowsPerPage, searchText, orderBy, shouldUpdate]);

  const handlePageChange = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: any) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  return (
    <Paper elevation={1}>
      <TableContainer>
        <Table stickyHeader aria-label="items table" style={{ marginTop: 4 }} size='small'>
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
