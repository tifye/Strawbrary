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
import LibraryItemCheckoutDialog from './LibraryItemCheckoutDialog';

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
  const [isCheckoutDialogOpen, setIsCheckoutDialogOpen] = useState(false);
  const isAnchorMenuOpen = Boolean(anchorEl);
  const itemRow = useRef(null);

  const { setEditingItem } = useContext(LibraryItemsContext);
  const handleEditClicked = () => {
    setEditingItem(item);
  };

  const handleCheckoutClicked = () => {
    setIsCheckoutDialogOpen(true);
  };

  const handleCheckinClicked = () => {
    // TODO: Implement checkin
  };
  
  const handleCheckoutDialogClose = () => {
    setIsCheckoutDialogOpen(false);
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
          {item.isBorrowable &&
          <Chip
            label="Available"
            color="success"
            onClick={(e) => { handleCheckoutClicked(); e.stopPropagation(); }}
          />
          }
          {!item.isBorrowable && item.borrower && 
          <Chip
            label="Checked out"
            color="warning"
            onClick={(e) => { handleCheckinClicked(); e.stopPropagation(); }}
          />
          }
          {!item.isBorrowable && !item.borrower && 
          <Chip
            label="Unavailable"
            color="error"
          />
          }
        </TableCell>
        <ClickAwayListener onClickAway={()=> setAnchorEl(null)}>
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
                setAnchorEl(e.currentTarget);
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
           <MenuItem onClick={()=> setAnchorEl(null)}>Check Out</MenuItem>   
        }
        {!item.isBorrowable && item.borrower &&
          <MenuItem onClick={()=> setAnchorEl(null)}>Check In</MenuItem>
        }
        <MenuItem onClick={handleEditClicked}>Edit</MenuItem>
      </Menu>

      <LibraryItemCheckoutDialog
        open={isCheckoutDialogOpen}
        handleClose={handleCheckoutDialogClose}
        item={item}
      />
    </>
  );
}
