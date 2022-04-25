import {
  Chip,
  ClickAwayListener,
  IconButton,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useContext, useRef, useState } from 'react';
import { LibraryItem } from '../../../../types';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LibraryItemsContext from '../LibraryItemsContext';

interface LibraryItemsTableRowProps {
  item: LibraryItem;
  selected: boolean;
}

const TextRowCell = ({ text }: { text: string }) => (
  <TableCell>
    <Typography
      color="textPrimary"
      variant="body1"
      style={{ maxWidth: '15vw' }}
      noWrap
    >
      {text}
    </Typography>
  </TableCell>
);

export default function LibraryItemsTableRow(props: LibraryItemsTableRowProps) {
  const { item } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isAnchorMenuOpen = Boolean(anchorEl);
  const itemRow = useRef(null);

  const { setEditingItem } = useContext(LibraryItemsContext);
  const handleEditClicked = () => {
    setEditingItem(item);
  };
  const handleCheckout = () => {
    alert('Checkout');
  };
  const handleActionsClose = () => {
    setAnchorEl(null);
  };
  const handleActionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <TableRow
        hover
        key={item.id}
        ref={itemRow}
        onClick={() => handleEditClicked()}
      >
        <TableCell>
          <Typography variant="body1" noWrap>
            {item.id}
          </Typography>
        </TableCell>

        <TextRowCell text={item.title} />
        <TextRowCell text={`${item.categoryId}`} />
        <TextRowCell text={item.type} />
        <TableCell>
          <Chip
            label={item.isBorrowable ? 'AVAILABLE' : 'UNAVAILABLE'}
            color={item.isBorrowable ? 'success' : 'error'}
            onClick={item.isBorrowable ? (e) => { handleCheckout(); e.stopPropagation(); } : () => {/* */}}
          />
        </TableCell>
        <ClickAwayListener onClickAway={handleActionsClose}>
          <TableCell align="right">
            <IconButton
              id="actions-button"
              edge="end"
              style={{ flexGrow: 1 }}
              aria-controls={isAnchorMenuOpen ? 'actions-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={isAnchorMenuOpen}
              onClick={(e) => {
                e.stopPropagation();
                handleActionsClick(e);
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </TableCell>
        </ClickAwayListener>
      </TableRow>

      <Menu
        id="library-item-anchor-menu"
        anchorEl={anchorEl}
        open={isAnchorMenuOpen}
        MenuListProps={{ 'aria-labelledby': 'actions-button' }}
      >
        {item.isBorrowable &&
           <MenuItem onClick={handleActionsClose}>Check Out</MenuItem>   
        }
        {!item.isBorrowable && item.borrower &&
          <MenuItem onClick={handleActionsClose}>Check In</MenuItem>
        }
        <MenuItem onClick={handleEditClicked}>Edit</MenuItem>
      </Menu>
    </>
  );
}
