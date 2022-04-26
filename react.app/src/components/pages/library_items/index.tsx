import { Grid } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import LibraryItemEditPanel from './LibraryItemEditPanel';
import LibraryItemsContentAppBar from './LibraryItemsContentAppBar';
import LibraryItemsTable from './LibraryItemsTable';
import { LibraryItem } from '../../../types';
import LibraryItemsContext from './LibraryItemsContext';



export default function LibraryItemsPage() {
  const [editingItem, setEditingItem] = React.useState<LibraryItem | null>(null);
  const [searchText, setSearchText] = React.useState<string>('');
  const [orderBy, setOrderBy] = React.useState<string>('categoryName');
  const contextValue = useMemo(() => ({
    editingItem,
    setEditingItem,
    searchText,
    setSearchText,
    orderBy,
    setOrderBy,
  }), [editingItem, searchText, orderBy]);
  const closeEditPanel = useCallback(() => {
    setEditingItem(null);
  }, []);
  return (
    <LibraryItemsContext.Provider value={contextValue}>
      <Grid container sx={{ p: 2, minHeight: '100%', minWidth: '100%'}}>
        <Grid item xs={12}>
          <LibraryItemsContentAppBar />
        </Grid>
        <Grid item xs={12} md={editingItem ? 9 : 12}>
          <LibraryItemsTable />
        </Grid>
        {editingItem && 
        <Grid item xs={12} md={3}>
          <LibraryItemEditPanel item={editingItem} closeEditPanel={closeEditPanel} />
        </Grid>}
      </Grid>
    </LibraryItemsContext.Provider>
  );
}
