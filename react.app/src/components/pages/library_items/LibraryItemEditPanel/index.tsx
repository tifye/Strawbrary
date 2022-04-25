import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
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
  const [newItem, setNewItem] = useState(JSON.parse(JSON.stringify(item)));
  const libraryItemsStore = useRef(new LibraryItemsStore());

  const handleDeleteDialogOpen = () => setDeleteDialogOpen(true);
  const handleDeleteDialogClose = () => setDeleteDialogOpen(false);

  const handleSave = useCallback(async () => {
    try {
      await libraryItemsStore.current.updateLibraryItem(newItem);
    } catch (error) {
      console.error(error);
    }
  }, [libraryItemsStore, newItem]);

  const handleFieldChange = useCallback((property: string, value: any) => {
    setNewItem({
      ...newItem,
      [property]: value,
    });
    console.log(`handleFieldChange: ${property} = ${value}`);
  }, [item]);
  return (
    <Paper component="aside" elevation={2}>
      <LibraryItemEditPanelAppBar />
      <Divider />

      <form>
        <Stack style={{ padding: 16 }} spacing={3}>
          {typeFieldFactory(item.type, {handleFieldChange, item})}
        </Stack>
      </form>
      <Box display="flex" sx={{ flexDirection: 'row-reverse', py: 1 }}>
        <Button variant="contained" color="success" onClick={() => handleSave()}>
          Save
        </Button>
        <Button color="primary">
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
          handleDelete={handleDeleteDialogClose}
          open={openDeleteDialog}
        />
      </Stack>
    </Paper>
  );
}
