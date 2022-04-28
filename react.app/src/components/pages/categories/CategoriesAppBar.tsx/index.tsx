import { Add } from '@mui/icons-material';
import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { ReloadButton } from '../../../sub_components/ReloadButton';
import CreateCategoriesDialog from './CreateCategoriesDialog';

interface CategoriesAppBarProps {
  update: () => void;
}

export default function CategoriesAppBar(props: CategoriesAppBarProps) {
  const { update } = props;
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <>
      <AppBar position='static' elevation={3} sx={{ textAlign: 'left' }}>
        <Toolbar variant="dense">
          <Typography variant='h6' noWrap sx={{ flexGrow: 1 }}>
            Edit Categories
          </Typography>
          <Stack spacing={1} direction="row">
            <ReloadButton onClick={update} label="Reload" />
            <Button
              color="success"
              variant="contained"
              startIcon={<Add />}
              onClick={() => setIsCreateDialogOpen(true)}
            >
              Create
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <CreateCategoriesDialog open={isCreateDialogOpen} handleClose={() => setIsCreateDialogOpen(false)} />
    </>
  );
} 