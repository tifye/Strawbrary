import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LibraryItemsStore } from '../../../../remote_access';
import { LibraryItem } from '../../../../types';
import LibraryItemDeleteDialog from './LibraryItemDeleteDialog';
import LibraryItemEditPanelAppBar from './LibraryItemEditPanelAppBar';
import typeFieldFactory from './typeFieldFactory';

interface LibraryItemEditPanelProps {
  item: LibraryItem;
}

export default function LibraryItemEditPanel(props: LibraryItemEditPanelProps) {
  const { item } = props;
  const [openDeleteDialog, setDeleteDialogOpen] = React.useState(false);
  const [newItem, setNewItem] = useState<LibraryItem>(JSON.parse(JSON.stringify(item)));
  const libraryItemsStore = useRef(new LibraryItemsStore());

  const handleDeleteDialogOpen = () => setDeleteDialogOpen(true);
  const handleDeleteDialogClose = () => setDeleteDialogOpen(false);

  useEffect(() => {
    setNewItem(item);
  }, [item]);

  const handleDelete = useCallback(async () => {
    try {
      const wasSuccessful = await libraryItemsStore.current.deleteLibraryItem(newItem);
      if (wasSuccessful) {
        setDeleteDialogOpen(false);
        // TODO: Close update panel and refresh table
      } else {
        throw new Error('Failed to delete item');
      }
    } catch (error) {
      // TODO: Display error message
      console.error(error);
    }
  }, [newItem, item]);

  const handleSave = useCallback(async () => {
    try {
      await libraryItemsStore.current.updateLibraryItem(newItem);
    } catch (error) {
      // TODO: Display error message
      console.error(error);
    }
  }, [item, newItem]);

  const handleFieldChange = useCallback((property: string, value: any) => {
    setNewItem({
      ...newItem,
      [property]: value,
    });
    console.log(`handleFieldChange: ${property} = ${value}`);
  }, [newItem, item]);

  const handleCancel = () => {
    console.log(item);
    console.log(newItem);
    
    setNewItem(item);
  };
  return (
    <Paper component="aside" elevation={2}>
      <LibraryItemEditPanelAppBar />
      <Divider />

      <form>
        <Stack style={{ padding: 16 }} spacing={3}>
          {typeFieldFactory(newItem.type, {handleFieldChange, item: newItem})}
        </Stack>
      </form>
      <Box display="flex" sx={{ flexDirection: 'row-reverse', py: 1 }}>
        <Button variant="contained" color="success" onClick={() => handleSave()}>
          Save
        </Button>
        <Button color="primary" onClick={() => handleCancel()}>
          Cancel
        </Button>
      </Box>
      <Divider />
      <Typography variant="caption">Delete this item</Typography>
      <Stack borderTop={1} borderColor="error.main" alignItems="center">
        <Button
          color="error"
          style={{ width: '50%', margin: 2 }}
          variant="contained"
          onClick={handleDeleteDialogOpen}
        >
          Delete
        </Button>
        <LibraryItemDeleteDialog
          item={item}
          handleClose={handleDeleteDialogClose}
          handleDelete={handleDelete}
          open={openDeleteDialog}
        />
      </Stack>
    </Paper>
  );
}
