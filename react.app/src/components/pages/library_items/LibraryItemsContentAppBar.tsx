import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import React from 'react';
import { SearchField, SearchIconWrapper, StyledInputBase } from '../../sub_components/SearchField';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function LibraryItemsContentAppBar() {
  const [search, setSearch] = React.useState('');
  const handleSearch = (searchText: string) => {
    setSearch(searchText);
  };
  return (
    <AppBar position="static" elevation={3}>
      <Toolbar variant="dense">
        <Button variant="contained" color="success" startIcon={<AddIcon />}>
          Create
        </Button>
        <Typography variant='h6' style={{ flexGrow: 1, textAlign: 'left', marginLeft: 16 }}>
          Items
        </Typography>
        <IconButton color="inherit">
          <FilterListIcon />
        </IconButton>
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
  );
}
