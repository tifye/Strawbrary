import {
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import React from 'react';
import { SearchField, SearchIconWrapper, StyledInputBase } from '../../sub_components/SearchField';

export default function LibraryItemsContentAppBar() {
  const [search, setSearch] = React.useState('');
  const handleSearch = (searchText: string) => {
    setSearch(searchText);
  };
  return (
    <>
      <AppBar position="static" elevation={3}>
        <Toolbar variant="dense">
          <Typography variant='h6' style={{ flexGrow: 1 }}>
            Items
          </Typography>
          <SearchField color="primary">
            <SearchIconWrapper>
              <Search />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              value={search}
            />
          </SearchField>
        </Toolbar>
      </AppBar>
    </>
  );
}
