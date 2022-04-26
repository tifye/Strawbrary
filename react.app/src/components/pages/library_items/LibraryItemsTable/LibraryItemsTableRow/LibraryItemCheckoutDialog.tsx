import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import { LibraryItemsStore } from '../../../../../remote_access';
import { LibraryItem } from '../../../../../types';
import { ItemInformationBox } from '../../../../sub_components/ItemInformationBox';

interface LibraryItemCheckoutDialogProps {
  open: boolean;
  handleClose: () => void;
  item: LibraryItem;
}

export default function LibraryItemCheckoutDialog(
  props: LibraryItemCheckoutDialogProps
) {
  const { open, handleClose, item } = props;
  const [isError, setIsError] = useState(false);
  const [borrower, setBorrower] = useState('');
  const libraryItemsStore = useRef(new LibraryItemsStore());

  const handleCheckoutClicked = useCallback(async () => {
    setIsError(false);
    try {
      item.borrower = borrower;
      await libraryItemsStore.current.checkoutLibraryItem(item);
      handleClose();
    } catch (e) {
      setIsError(true);
    }
  }, [item, borrower]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBorrower(e.target.value);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="checkout-item-dialog"
    >
      {isError && <Alert severity='error'>Something went wrong. Please try again later.</Alert>}

      <DialogTitle id="checkout-item-dialog">Checkout Item</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to checkout this item?
        </DialogContentText>
        <ItemInformationBox item={item} />
        <TextField
          autoFocus
          margin="dense"
          id="checkout-item-borrower"
          label="Borrower's name"
          fullWidth
          variant="standard"
          value={borrower}
          onChange={onInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCheckoutClicked} variant="contained" color="success">
          Checkout
        </Button>
      </DialogActions>
    </Dialog>
  );
}
