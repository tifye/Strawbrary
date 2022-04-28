/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { LibraryItem } from '../../../../types';
import AuthorEditField from './EditPanelControlFields/AuthorEditField';
import PagesEditField from './EditPanelControlFields/PagesEditField';
import TitleEditField from './EditPanelControlFields/TitleEditField';
import ItemTypeEditField from './EditPanelControlFields/ItemTypeEditField';
import CategoryEditField from './EditPanelControlFields/CategoryEditField';
import RunTimeMinutesEditField from './EditPanelControlFields/RunTimeMinutesEditField';

interface FieldFactoryProps {
  item: LibraryItem;
  handleFieldChange: (property: string, value: any) => void;
  errors: any;
  [key: string]: any;
}

const requireFields = {
  'Book': ({ item, handleFieldChange, errors, ...rest}: FieldFactoryProps) => (
    <React.Fragment>
      <TitleEditField title={item.title} handleFieldChange={handleFieldChange} error={errors['title']} {...rest} />
      <AuthorEditField author={item.author!} handleFieldChange={handleFieldChange} error={errors['author']} {...rest}/>
      <PagesEditField pages={item.pages!} handleFieldChange={handleFieldChange} error={errors['pages']} {...rest}/>
      <ItemTypeEditField itemType={item.type!} handleFieldChange={handleFieldChange} />
      <CategoryEditField selectedValue={item.category!} handleChange={handleFieldChange} error={errors['categoryId']}/>
    </React.Fragment>
  ),
  'AudioBook': ({ item, handleFieldChange, errors, ...rest}: FieldFactoryProps) => (
    <React.Fragment>
      <TitleEditField title={item.title} handleFieldChange={handleFieldChange} error={errors['title']} {...rest} />
      <RunTimeMinutesEditField runTimeMinutes={item.runTimeMinutes!} handleFieldChange={handleFieldChange} error={errors['runTimeMinutes']} {...rest}/>
      <ItemTypeEditField itemType={item.type!} handleFieldChange={handleFieldChange} />
      <CategoryEditField selectedValue={item.category!} handleChange={handleFieldChange} error={errors['categoryId']}/>
    </React.Fragment>
  ),
  'Dvd': ({ item, handleFieldChange, errors, ...rest}: FieldFactoryProps) => (
    <React.Fragment>
      <TitleEditField title={item.title} handleFieldChange={handleFieldChange} error={errors['title']} {...rest} />
      <RunTimeMinutesEditField runTimeMinutes={item.runTimeMinutes!} handleFieldChange={handleFieldChange} error={errors['runTimeMinutes']} {...rest}/>
      <ItemTypeEditField itemType={item.type!} handleFieldChange={handleFieldChange} />
      <CategoryEditField selectedValue={item.category!} handleChange={handleFieldChange} error={errors['categoryId']}/>
    </React.Fragment>
  ),
  'ReferenceBook': ({ item, handleFieldChange, errors, ...rest}: FieldFactoryProps) => (
    <React.Fragment>
      <TitleEditField title={item.title} handleFieldChange={handleFieldChange} error={errors['title']} {...rest} />
      <AuthorEditField author={item.author!} handleFieldChange={handleFieldChange} error={errors['author']} {...rest}/>
      <PagesEditField pages={item.pages!} handleFieldChange={handleFieldChange} error={errors['pages']} {...rest}/>
      <ItemTypeEditField itemType={item.type!} handleFieldChange={handleFieldChange} />
      <CategoryEditField selectedValue={item.category!} handleChange={handleFieldChange} error={errors['categoryId']}/>
    </React.Fragment>
  ),
};

export default function typeFieldFactory (type: string, props: FieldFactoryProps) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  /* @ts-ignore */
  const requiredFieldsFactory = requireFields[type];

  // If not a recognized type then show all fields
  if (!requiredFieldsFactory) {
    const { item, handleFieldChange, ...rest } = props;
    return (
      <React.Fragment>
        <TitleEditField title={item.title} handleFieldChange={handleFieldChange} {...rest}/>
        <AuthorEditField author={item.author!} handleFieldChange={handleFieldChange} {...rest}/>
        <PagesEditField pages={item.pages!} handleFieldChange={handleFieldChange} {...rest}/>
        <RunTimeMinutesEditField runTimeMinutes={item.runTimeMinutes!} handleFieldChange={handleFieldChange} {...rest}/>
        <ItemTypeEditField itemType={item.type!} handleFieldChange={handleFieldChange} {...rest}/>
        <CategoryEditField selectedValue={item.category!} handleChange={handleFieldChange} {...rest}/>
      </React.Fragment>
    );
  }  
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  /* @ts-ignore */
  return requireFields[type](props);
}
