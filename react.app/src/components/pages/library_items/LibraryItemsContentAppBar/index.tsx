import {
  AppBar,
  Button,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { Replay, Search } from '@mui/icons-material';
import React, { useContext, useCallback } from 'react';
import { SearchField, SearchIconWrapper, StyledInputBase } from '../../../sub_components/SearchField';
import AddIcon from '@mui/icons-material/Add';
import LibraryItemsContext from '../LibraryItemsContext';
import OrderBySelect from './OrderBySelect';

export default function LibraryItemsContentAppBar({ update }: { update: () => void }) {
  const { searchText, setSearchText, orderBy, setOrderBy } = useContext(LibraryItemsContext);

  const handleSearch = useCallback((search: string) => {
    setSearchText(search);
  }, [setSearchText]);
  return (
    <>
      <AppBar position="static" elevation={3}>
        <Toolbar variant="dense">
          <Typography variant='h6' style={{ flexGrow: 1, textAlign: 'left', marginLeft: 16 }}>
            Items
          </Typography>
          <IconButton onClick={() => update()} style={{ color: 'white' }}>
            <Replay />
          </IconButton>
          <OrderBySelect orderBy={orderBy} setOrderBy={setOrderBy} />
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
              value={searchText}
            />
          </SearchField>
          <Divider orientation='vertical' sx={{ mx: 2 }}/>
          <Button variant="contained" color="success" startIcon={<AddIcon />}>
            Create
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}


