import React from 'react';
import { LibraryItem } from '../../../types';

const LibraryItemsContext = React.createContext({
  editingItem: {} as LibraryItem | null,
  setEditingItem: (() => { /* do nothing */ } ) as any,
});

export default LibraryItemsContext;