import React from 'react';
import BaseTextEditField from './BaseFieldTypes/BaseTextEditField';

export default function AuthorEditField(props: {
  title: string;
  handleFieldChange: (property: string, value: any) => void;
  error?: any;
}) {
  const { title, handleFieldChange, error } = props;
  return (
    <BaseTextEditField
      label="Title"
      ariaLabel="title"
      value={title}
      error={error}
      handleChange={(value: any) => handleFieldChange('title', value)}
    />
  );
}
