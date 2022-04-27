import { Add } from '@mui/icons-material';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import CreateCategoriesDialog from './CreateCategoriesDialog';

export default function CategoriesAppBar() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);


  return (
    <>
      <AppBar position='static' elevation={3} sx={{ textAlign: 'left' }}>
        <Toolbar variant="dense">
          <Typography variant='h6' noWrap sx={{ flexGrow: 1 }}>
            Edit Categories
          </Typography>
          <Button
            color="success"
            variant="contained"
            startIcon={<Add />}
            onClick={() => setIsCreateDialogOpen(true)}
          >
            Create
          </Button>
        </Toolbar>
      </AppBar>
      <CreateCategoriesDialog open={isCreateDialogOpen} handleClose={() => setIsCreateDialogOpen(false)} />
    </>
  );
} 