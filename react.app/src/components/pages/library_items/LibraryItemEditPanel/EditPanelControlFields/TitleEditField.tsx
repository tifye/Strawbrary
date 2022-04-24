import React from 'react';
import BaseTextEditField from './BaseFieldTypes/BaseTextEditField';

export default function AuthorEditField(props: {title: string, handleFieldChange: (property: string, value: any) => void}) {
  const {title, handleFieldChange} = props;
  return (
    <BaseTextEditField label='Title' ariaLabel='title' value={title} handleChange={(value: any) => handleFieldChange('title', value)}/>
  );
}