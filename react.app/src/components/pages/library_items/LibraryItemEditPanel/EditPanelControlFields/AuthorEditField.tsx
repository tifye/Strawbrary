import React from 'react';
import BaseTextEditField from './BaseFieldTypes/BaseTextEditField';

export default function AuthorEditField(props: {
  author: string;
  handleFieldChange: (property: string, value: any) => void;
  error?: any;
}) {
  const { author, handleFieldChange, error } = props;
  return (
    <BaseTextEditField
      label="Author"
      ariaLabel="author"
      value={author}
      error={error}
      handleChange={(value: any) => handleFieldChange('author', value)}
    />
  );
}
