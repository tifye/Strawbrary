import React from 'react';
import './App.css';
import { useRoutes } from 'react-router-dom';
import { CategoriesPage, LibraryItemsPage } from './pages';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Header from './Appbar';

const AppRoutes = () => useRoutes([
  { path: '/', element: <LibraryItemsPage /> },
  { path: '/libraryitems', element: <LibraryItemsPage /> },
  { path: '/categories', element: <CategoriesPage /> },
]);

function App() {
  return (
    <div className="App">
      <Box sx ={{ display: 'flex', with: '100%'}}>
        <Navbar />
        <Box style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <Header />
          <Box component="main" sx={{ flex: 1 }}>
            <AppRoutes />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default App;
