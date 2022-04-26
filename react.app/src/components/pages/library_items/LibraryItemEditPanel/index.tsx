import { Alert, Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LibraryItemsStore } from '../../../../remote_access';
import { LibraryItem } from '../../../../types';
import LibraryItemDeleteDialog from './LibraryItemDeleteDialog';
import LibraryItemEditPanelAppBar from './LibraryItemEditPanelAppBar';
import typeFieldFactory from './typeFieldFactory';
import { collectErrors } from '../../../../collect_validation_errors';

interface LibraryItemEditPanelProps {
  item: LibraryItem;
  closeEditPanel: () => void;
}

export default function LibraryItemEditPanel(props: LibraryItemEditPanelProps) {
  const { item, closeEditPanel } = props;
  const [openDeleteDialog, setDeleteDialogOpen] = React.useState(false);
  const [newItem, setNewItem] = useState<LibraryItem>(item);
  const [onCancel, setOnCancel] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const libraryItemsStore = useRef(new LibraryItemsStore());

  const handleDeleteDialogOpen = () => setDeleteDialogOpen(true);
  const handleDeleteDialogClose = () => setDeleteDialogOpen(false);

  useEffect(() => {
    setLoading(true);
    libraryItemsStore.current.getLibraryItem(item.id).then(async (_item) => {
      await _item.attachCategory();
      setNewItem(_item);
      setLoading(false);
    });
    setOnCancel(false);
    setSuccess(false);
  }, [item, onCancel]);

  const handleDelete = useCallback(async () => {
    try {
      const wasSuccessful = await libraryItemsStore.current.deleteLibraryItem(newItem);
      if (wasSuccessful) {
        setDeleteDialogOpen(false);
        closeEditPanel();
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
      setSuccess(true);
    } catch (error) {
      // TODO: Display error message
      console.error(error);
    }
  }, [newItem]);

  const handleCancel = useCallback(async () => {
    setOnCancel(true);
    setErrors({});
  }, [item, newItem]);

  const handleFieldChange = useCallback(async (property: string, value: any) => {
    newItem[property] = value;
    setErrors(await collectErrors(newItem));
    setNewItem(newItem);
    console.log(`handleFieldChange: ${property} = ${value}`);
  }, [newItem, item]);

  console.log(errors);

  return (
    <Paper component="aside" elevation={2}>
      <LibraryItemEditPanelAppBar closeEditPanel={closeEditPanel} />
      {success && 
        <Alert severity='success'>
          Success
        </Alert>
      }
      <Divider />
      {!loading && 
        <form>
          <Stack style={{ padding: 16 }} spacing={3}>
            {typeFieldFactory(newItem.type, {handleFieldChange, item: newItem, errors})}
          </Stack>
        </form>
      }
      <Box display="flex" sx={{ flexDirection: 'row-reverse', p: 1 }}>
        <Button
          variant="contained"
          color="success"
          onClick={() => handleSave()}
          disabled={Object.keys(errors).length > 0}
        >
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
