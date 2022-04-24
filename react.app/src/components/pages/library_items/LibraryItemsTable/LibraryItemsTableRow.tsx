import {
  ClickAwayListener,
  IconButton,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { LibraryItem } from '../../../../types';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isAnchorMenuOpen = Boolean(anchorEl);
  const itemRow = useRef(null);

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
        onClick={() => setOpen(!open)}
      >
        <TableCell>
          <Typography variant="body1" noWrap>
            {item.id}
          </Typography>
        </TableCell>

        <TextRowCell text={item.title} />
        <TextRowCell text={`${item.categoryId}`} />
        <TextRowCell text={item.type} />
        <TextRowCell text={item.isBorrowable ? 'AVAILABLE' : 'UNAVAILABLE'} />
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
        <MenuItem onClick={handleActionsClose}>Checkout item</MenuItem>
        <MenuItem onClick={handleActionsClose}>Edit</MenuItem>
      </Menu>
    </>
  );
}
