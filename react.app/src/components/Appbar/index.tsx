import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';

export default function Header() {
  return (
    <>
      <AppBar color="primary" position="static" elevation={0}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ ml: 2, display: { xs: 'none', md: 'flex' }, flexGrow: 1 }}
          >
            Administration
          </Typography>
          <Button color="inherit">Help</Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
