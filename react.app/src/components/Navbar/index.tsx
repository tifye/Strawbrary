import React from 'react-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NavbarItem from './NavbarItem';

const drawerWidth = 200;

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
    <List style={{ width: drawerWidth }}>
      <ListItem>
      <ListItemIcon><MenuBookIcon /></ListItemIcon>
      <ListItemText>Strawbrary</ListItemText>
      </ListItem>
      { navItems.map( (item) => (
        <NavbarItem key={item.id} {...item} />
      ))}
    </List>
  );
}
