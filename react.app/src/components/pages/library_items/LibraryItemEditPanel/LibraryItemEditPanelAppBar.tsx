import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Close } from '@mui/icons-material';

export default function LibraryItemEditPanelAppBar ({ closeEditPanel }: { closeEditPanel: () => void }) {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar variant="dense">
        <Typography variant='h6' style={{ flexGrow: 1 }}>
          Item information
        </Typography>
        <IconButton
          aria-label='deselect item'
          aria-controls='item-information'
          color='inherit'
          onClick={() => closeEditPanel()}
        >
          <Close />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

