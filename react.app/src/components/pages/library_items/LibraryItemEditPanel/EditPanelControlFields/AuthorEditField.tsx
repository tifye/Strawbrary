import React from 'react';
import BaseTextEditField from './BaseFieldTypes/BaseTextEditField';

export default function AuthorEditField(props: {author: string, handleFieldChange: (property: string, value: any) => void}) {
  const {author, handleFieldChange} = props;
  return (
    <BaseTextEditField label="Author" ariaLabel='author' value={author} handleChange={(value: any) => handleFieldChange('author', value)}/>
  );
}