import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from '@mui/material';
import React from 'react';
import { LibraryItem } from '../../../../types';

interface LibraryItemCheckinDialogProps {
  open: boolean;
  handleClose: () => void;
  item: LibraryItem;
}

export default function LibraryItemCheckinDialog(
  props: LibraryItemCheckinDialogProps
) {
  const { open, handleClose, item } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="checkin-item-dialog"
    >
      <DialogTitle id="checkin-item-dialog">Checkin Item</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to checkin this item?
        </DialogContentText>
        <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
          <Chip label={item.id} color="info" />
          <Chip label={item.title} color="info" />
          <Chip label={item.type} color="info" />
          <Chip
            label={item.isBorrowable ? 'Available' : 'Unavailable'}
            color="info"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} variant="contained" color="success">
          Checkin
        </Button>
      </DialogActions>
    </Dialog>
  );
}
