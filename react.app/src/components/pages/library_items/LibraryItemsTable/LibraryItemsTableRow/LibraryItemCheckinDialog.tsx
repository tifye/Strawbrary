import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import { LibraryItemsStore } from '../../../../../remote_access';
import { LibraryItem } from '../../../../../types';
import { ItemInformationBox } from '../../../../sub_components/ItemInformationBox';

interface LibraryItemCheckinDialogProps {
  open: boolean;
  handleClose: () => void;
  item: LibraryItem;
}

export default function LibraryItemCheckinDialog(
  props: LibraryItemCheckinDialogProps
) {
  const { open, handleClose, item } = props;
  const [isError, setIsError] = useState(false);

  const libraryItemsStore = useRef(new LibraryItemsStore());

  const handleCheckinClicked = useCallback(async () => {
    setIsError(false);
    try {
      await libraryItemsStore.current.checkinLibraryItem(item);
      handleClose();
    } catch (e) {
      setIsError(true);
    }
  }, [item]);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="checkin-item-dialog"
    >
      {isError && <Alert severity='error'>Something went wrong. Please try again later.</Alert>}
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
        <Button onClick={handleCheckinClicked} variant="contained" color="success">
          Checkin
        </Button>
      </DialogActions>
    </Dialog>
  );
}
