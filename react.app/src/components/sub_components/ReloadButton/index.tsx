import { Replay } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';

interface ReloadButtonProps {
  onClick: () => void;
  label: string;
}

export function ReloadButton (props: ReloadButtonProps) {
  const { onClick, label } = props;
  return (
    <Button
      variant="contained"
      startIcon={<Replay />}
      onClick={onClick}
      color="secondary"
    >
      {label}
    </Button>
  );
}