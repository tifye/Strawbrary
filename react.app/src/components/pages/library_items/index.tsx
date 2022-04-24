import { Grid } from '@mui/material';
import React from 'react';
import LibraryItemEditPanel from './LibraryItemEditPanel';
import LibraryItemsContentAppBar from './LibraryItemsContentAppBar';
import LibraryItemsTable from './LibraryItemsTable';
import data from './LibraryItemsTable/__mock_data__.json';

export default  function LibraryItemsPage() {
  return (
    <>
      <Grid container sx={{ p: 2, minHeight: '100%', minWidth: '100%'}}>
        <Grid item xs={12}>
          <LibraryItemsContentAppBar />
        </Grid>
        <Grid item xs={8}>
          <LibraryItemsTable />
        </Grid>
        <Grid item xs={4}>
          <LibraryItemEditPanel item={data[0]} />
        </Grid>
      </Grid>
    </>
  );
}
