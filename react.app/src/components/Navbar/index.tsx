import React from 'react-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NavbarItem from './NavbarItem';

const drawerWidth = 256;

const navItems = [
  {
    id: 'Library Items',
    path: '/libraryitems',
  },
  {
    id: 'Categoies',
    path: '/categories',
  }
];

export default function Navbar() {
  return (
    <Drawer variant='permanent' style={{ width: drawerWidth }}>
      <List>
        <ListItem>
        <ListItemIcon><MenuBookIcon /></ListItemIcon>
        <ListItemText>Strawbrary</ListItemText>
        </ListItem>
      </List>
      { navItems.map( (item) => (
        <NavbarItem key={item.id} {...item} />
      ))}
    </Drawer>
  );
}
