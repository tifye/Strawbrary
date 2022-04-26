import { Stack, Chip } from '@mui/material';
import React from 'react';
import { LibraryItem } from '../../types';

interface ItemInformationBoxProps {
  item: LibraryItem;
}

export function ItemInformationBox(props: ItemInformationBoxProps) {
  const { item } = props;
  return (
    <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
      <Chip label={item.id} color="info"/>
      <Chip label={item.title} color="info"/>
      <Chip label={item.type} color="info"/>
      <Chip label={item.isBorrowable ? 'Available' : 'Unavailable'} color="info"/>
    </Stack>
  );
}
