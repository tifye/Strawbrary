import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { LibraryItem } from '../../../../types';
import CategoryEditField from './EditPanelControlFields/CategoryEditField';
import LibraryItemDeleteDialog from './LibraryItemDeleteDialog';
import LibraryItemEditPanelAppBar from './LibraryItemEditPanelAppBar';
import categories from '../../../../__mock_data__/categories.json';
import AuthorEditField from './EditPanelControlFields/AuthorEditField';
import TitleEditField from './EditPanelControlFields/TitleEditField';
import PagesEditField from './EditPanelControlFields/PagesEditField';
import RunTimeMinutesEditField from './EditPanelControlFields/RunTimeMinutesEditField';
import ItemTypeEditField from './EditPanelControlFields/ItemTypeEditField';

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
          <TitleEditField title={item.title} handleFieldChange={handleFieldChange} />
          <AuthorEditField author={item.author!} handleFieldChange={handleFieldChange}/>
          <PagesEditField pages={item.pages!} handleFieldChange={handleFieldChange}/>
          <RunTimeMinutesEditField runTimeMinutes={item.runTimeMinutes!} handleFieldChange={handleFieldChange}/>
          <ItemTypeEditField itemType={item.type!} handleFieldChange={handleFieldChange} />
          <CategoryEditField selectedValue={categories[0]} handleChange={handleFieldChange}/>
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
