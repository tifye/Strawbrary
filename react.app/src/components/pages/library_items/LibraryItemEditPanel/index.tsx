import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { LibraryItem } from '../../../../types';
import BaseDropDownEditField from './EditPanelControlFields/BaseFieldTypes/BaseDropDownEditField';
import BaseNumberEditField from './EditPanelControlFields/BaseFieldTypes/BaseNumberEditField';
import BaseTextEditField from './EditPanelControlFields/BaseFieldTypes/BaseTextEditField';
import CategoryEditField from './EditPanelControlFields/CategoryEditField';
import LibraryItemDeleteDialog from './LibraryItemDeleteDialog';
import LibraryItemEditPanelAppBar from './LibraryItemEditPanelAppBar';
import categories from '../../../../__mock_data__/categories.json';

const itemTypes = ['Book', 'AudioBook', 'ReferenceBook', 'Dvd'];

interface LibraryItemEditPanelProps {
  item: LibraryItem;
}

export default function LibraryItemEditPanel(props: LibraryItemEditPanelProps) {
  const { item } = props;
  const [openDeleteDialog, setDeleteDialogOpen] = React.useState(false);
  
  const handleDeleteDialogOpen = () => setDeleteDialogOpen(true);
  const handleDeleteDialogClose = () => setDeleteDialogOpen(false);

  const handleFieldChange = (property: string, value: any) => {
    console.log(`${property} changed to ${value}`);
  };

  return (
    <Paper component="aside" elevation={2}>
      <LibraryItemEditPanelAppBar />
      <Divider />

      <form>
        <Stack style={{ padding: 16 }} spacing={3}>
          <BaseTextEditField label='Title' ariaLabel='title' value={item.title} handleChange={(value: any) => handleFieldChange('title', value)}/>
          <BaseTextEditField label="Author" ariaLabel='author' value={item.author!} handleChange={(value: any) => handleFieldChange('author', value)}/>
          <BaseNumberEditField label="Number of Pages" ariaLabel='number-of-pages' value={item.pages!} handleChange={(value: any) => handleFieldChange('pages', value)}/>
          <BaseNumberEditField label="Run Time Minutes" ariaLabel="run-time-minutes" value={item.runTimeMinutes!} handleChange={(value: any) => handleFieldChange('runTimeMinutes', value)}/>
          <BaseDropDownEditField label="Item Type" ariaLabel='item-type' selectedValue={item.type} values={itemTypes} handleChange={(value: any) => handleFieldChange('type', value)}/>
          <CategoryEditField label="Category" ariaLabel='category' selectedValue={categories[0]} handleChange={(value: any) => handleFieldChange('categoryId', value)}/>
        </Stack>
      </form>
      <Box display="flex" sx={{ flexDirection: 'row-reverse', py: 1 }}>
        <Button variant="contained" color="success">
          Save
        </Button>
        <Button color="primary">
          Cancel
        </Button>
      </Box>
      <Divider />
      <Typography variant="caption">Delete this item</Typography>
      <Stack borderTop={1} borderColor="error.main" alignItems="center">
        <Button
          color="error"
          style={{ width: '50%', margin: 2 }}
          variant="contained"
          onClick={handleDeleteDialogOpen}
        >
          Delete
        </Button>
        <LibraryItemDeleteDialog
          item={item}
          handleClose={handleDeleteDialogClose}
          handleDelete={handleDeleteDialogClose}
          open={openDeleteDialog}
        />
      </Stack>
    </Paper>
  );
}
