import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { LibraryItem } from '../../../../types';
import LibraryItemDeleteDialog from './LibraryItemDeleteDialog';
import LibraryItemEditPanelAppBar from './LibraryItemEditPanelAppBar';

interface LibraryItemEditPanelProps {
  item: LibraryItem;
}

export default function LibraryItemEditPanel(props: LibraryItemEditPanelProps) {
  const { item } = props;
  const [openDeleteDialog, setDeleteDialogOpen] = React.useState(false);
  
  const handleDeleteDialogOpen = () => setDeleteDialogOpen(true);
  const handleDeleteDialogClose = () => setDeleteDialogOpen(false);
  return (
    <Box component="aside">
      <LibraryItemEditPanelAppBar />
      <Divider />

      <form></form>

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
    </Box>
  );
}
