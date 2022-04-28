import { Edit } from '@mui/icons-material';
import { Badge, Chip, Grid, Paper } from '@mui/material';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { CategoriesStore } from '../../../remote_access';
import { Category } from '../../../types';
import CategoriesAppBar from './CategoriesAppBar.tsx';
import EditCategoryDialog from './EditCategoryDialog.tsx';

export default  function CategoriesPage() {
  const categoriesStore = useRef(new CategoriesStore());
  const [categories, setCategories] = useState<Category[]>([]);
  const [isEditCategoryDialogOpen, setEditCategoryDialogOpen] = React.useState(false);
  const [categoryInEdit, setCategoryInEdit] = useState<Category | null>(null);
  const [shouldReload, forceUpdate] = useReducer(x => x + 1, 0);

  const onEditCategory = (category: Category) => {
    setEditCategoryDialogOpen(true);
    setCategoryInEdit(category);
  };

  const handleEditCategoryDialogClose = () => {
    setEditCategoryDialogOpen(false);
    setCategoryInEdit(null);
  };

  useEffect(() => {
    categoriesStore.current.getCategories().then(setCategories);
  }, [shouldReload]);
  return (
    <>
      <Grid
        container
        sx={{ p: 2, minHeight: '100%', minWidth: '100%'}}
        spacing={1}
      >
        <Grid item xs={12}>
          <CategoriesAppBar update={forceUpdate}/>
        </Grid>
        <Grid item xs={12}>
          <Paper 
            sx={{ 
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row',
              p: 2,
            }}
          >
            <Grid container spacing={2}>
              {categories.map(category => (
              <Grid item key={category.id}>
                <Badge color="secondary" badgeContent={category._count?.libraryItems} max={999}>
                  <Chip
                    color="primary"
                    key={category.id}
                    label={`${category.categoryName}`}
                    icon={<Edit />}
                    onClick={() => onEditCategory(category)}
                  />
                </Badge>
              </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      {categoryInEdit &&
      <EditCategoryDialog
        open={isEditCategoryDialogOpen} 
        handleClose={handleEditCategoryDialogClose}
        category={categoryInEdit}
      />
      }
    </>
  );
}
