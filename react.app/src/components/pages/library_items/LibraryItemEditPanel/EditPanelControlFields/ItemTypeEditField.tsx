import React from 'react';
import BaseDropDownEditField from './BaseFieldTypes/BaseDropDownEditField';

const itemTypes = ['Book', 'AudioBook', 'ReferenceBook', 'Dvd'];

export default function ItemTypeEditField(props: {itemType: string, handleFieldChange: (property: string, value: any) => void}) {
  const {itemType, handleFieldChange} = props;
  return (
    <BaseDropDownEditField label="Item Type" ariaLabel='item-type' selectedValue={itemType} values={itemTypes} handleChange={(value: any) => handleFieldChange('type', value)}/>
  );
}