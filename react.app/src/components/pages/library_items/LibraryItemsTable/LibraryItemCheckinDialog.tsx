import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import { LibraryItem } from '../../../../types';
import { ItemInformationBox } from '../../../sub_components/ItemInformationBox';

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
        <ItemInformationBox item={item} />
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
