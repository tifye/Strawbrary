import { AppBar, Chip, Toolbar, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
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
          <Typography variant="caption">made by</Typography>
          <Chip
            component="a"
            icon={<GitHubIcon />}
            href="https://github.com/tifye/Strawbrary"
            color="secondary"
            label="tifye"
            target="_blank"
            style={{ margin: 8 }}
            clickable
          />
        </Toolbar>
      </AppBar>
    </>
  );
}
