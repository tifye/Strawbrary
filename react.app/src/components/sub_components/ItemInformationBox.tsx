import { Stack, Chip, Paper } from '@mui/material';
import React from 'react';
import { LibraryItem } from '../../types';

interface ItemInformationBoxProps {
  item: LibraryItem;
}

export function ItemInformationBox(props: ItemInformationBoxProps) {
  const { item } = props;
  return (
    <Paper elevation={1} sx={{ p: 1, pb: 2 }}>
      <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
        <Chip label={item.id} color="info"/>
        <Chip label={item.title} color="info"/>
        <Chip label={item.type} color="info"/>
        <Chip label={item.isBorrowable ? 'Available' : 'Unavailable'} color="info"/>
      </Stack>
        {item.borrower &&
          <>
            {`Checked out by ${item.borrower}`}
          </>
        }
    </Paper>
  );
}
