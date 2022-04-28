import React from 'react';
import BaseNumberEditField from './BaseFieldTypes/BaseNumberEditField';

export default function PagesEditField(props: {
  pages: number;
  handleFieldChange: (property: string, value: any) => void;
  error?: any;
}) {
  const { pages, handleFieldChange, error } = props;
  return (
    <BaseNumberEditField
      label="Number of Pages"
      ariaLabel="number-of-pages"
      value={pages}
      error={error}
      handleChange={(value: any) => handleFieldChange('pages', value)}
    />
  );
}
