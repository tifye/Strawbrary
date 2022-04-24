import React from 'react';
import BaseNumberEditField from './BaseFieldTypes/BaseNumberEditField';

export default function PagesEditField(props: {pages: number, handleFieldChange: (property: string, value: any) => void}) {
  const {pages, handleFieldChange} = props;
  return (
    <BaseNumberEditField label="Number of Pages" ariaLabel='number-of-pages' value={pages} handleChange={(value: any) => handleFieldChange('pages', value)}/>
  );
}