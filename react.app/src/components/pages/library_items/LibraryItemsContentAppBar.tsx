import {
  AppBar,
  InputBase,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import React from 'react';

const SearchField = styled('div')(({ theme }) => ({
  position: 'relative',
  color: 'black',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'white',
  marginLeft: 0,
  marginRight: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  backgroundColor: 'transparent',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function LibraryItemsContentAppBar() {
  const [search, setSearch] = React.useState('');
  const handleSearch = (searchText: string) => {
    setSearch(searchText);
  };
  return (
    <>
      <AppBar position="static" elevation={1}>
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
