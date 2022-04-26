import { Alert } from '@mui/material';
import React from 'react';

export default function ErrorAlert({ errors }: { errors: string[] }) {
  return (
    <Alert severity="error" icon={false}>
      {errors.map((error: string) => (
      <><span key={error}>{error}</span><br /></>
      ))}
    </Alert>
  );
}