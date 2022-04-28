import React from 'react';
import { LibraryItem } from '../../../types';

const LibraryItemsContext = React.createContext({
  editingItem: {} as LibraryItem | null,
  setEditingItem: (() => { /* do nothing */ } ) as any,
  searchText: 'string' as string,
  setSearchText: (() => { /* do nothing */ } ) as any,
  orderBy: 'type' as string,
  setOrderBy: (() => { /* do nothing */ } ) as any,
  shouldUpdate: 0,
});

export default LibraryItemsContext;