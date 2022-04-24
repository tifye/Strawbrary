import { Grid } from '@mui/material';
import React from 'react';
import LibraryItemsContentAppBar from './LibraryItemsContentAppBar';

export default  function LibraryItemsPage() {
  return (
    <>
      <Grid container sx={{ p: 2, minHeight: '100%', minWidth: '100%'}}>
        <Grid item xs={12}>
          <LibraryItemsContentAppBar />
        </Grid>
        <Grid item xs={8}>
          Content body
        </Grid>
        <Grid item xs={4}>
          Content sidebar
        </Grid>
      </Grid>
    </>
  );
}
