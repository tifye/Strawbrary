import { ListItem, ListItemText } from '@mui/material';
import React from 'react-dom';
import { useNavigate } from 'react-router';

interface NavbarItemProps {
  id: string;
  path: string;
}

export default function NavbarItem(props: NavbarItemProps) {
  const { id, path } = props;
  const navigate = useNavigate();
  return (
    <>
      <ListItem button color="primary" onClick={() => navigate(path)}>
        <ListItemText>{id}</ListItemText>
      </ListItem>
    </>
  );
}
