import { Grid } from '@mui/material';
import React from 'react';
import LibraryItemEditPanel from './LibraryItemEditPanel';
import LibraryItemsContentAppBar from './LibraryItemsContentAppBar';
import LibraryItemsTable from './LibraryItemsTable';
import data from '../../../__mock_data__/items.json';

export default  function LibraryItemsPage() {
  return (
    <>
      <Grid container sx={{ p: 2, minHeight: '100%', minWidth: '100%'}}>
        <Grid item xs={12}>
          <LibraryItemsContentAppBar />
        </Grid>
        <Grid item xs={9}>
          <LibraryItemsTable />
        </Grid>
        <Grid item xs={3}>
          <LibraryItemEditPanel item={data[3]} />
        </Grid>
      </Grid>
    </>
  );
}
