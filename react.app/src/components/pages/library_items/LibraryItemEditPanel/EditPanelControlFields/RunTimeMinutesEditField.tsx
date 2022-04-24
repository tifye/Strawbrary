import React from 'react';
import BaseNumberEditField from './BaseFieldTypes/BaseNumberEditField';

export default function RunTimeMinutesEditField(props: {runTimeMinutes: number, handleFieldChange: (property: string, value: any) => void}) {
  const {runTimeMinutes, handleFieldChange} = props;
  return (
    <BaseNumberEditField label="Run Time Minutes" ariaLabel="run-time-minutes" value={runTimeMinutes} handleChange={(value: any) => handleFieldChange('runTimeMinutes', value)}/>
  );
}