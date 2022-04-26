import React from 'react';
import BaseNumberEditField from './BaseFieldTypes/BaseNumberEditField';

export default function RunTimeMinutesEditField(props: {
  runTimeMinutes: number;
  handleFieldChange: (property: string, value: any) => void;
  error?: any;
}) {
  const { runTimeMinutes, handleFieldChange, error } = props;
  return (
    <BaseNumberEditField
      label="Run Time Minutes"
      ariaLabel="run-time-minutes"
      value={runTimeMinutes}
      error={error}
      handleChange={(value: any) => handleFieldChange('runTimeMinutes', value)}
    />
  );
}
