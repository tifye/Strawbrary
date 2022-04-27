import { Chip, Grid, Paper } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { CategoriesStore } from '../../../remote_access';
import { Category } from '../../../types';
import CategoriesAppBar from './CategoriesAppBar.tsx';

export default  function CategoriesPage() {
  const categoriesStore = useRef(new CategoriesStore());
  const [categories, setCategories] = React.useState<Category[]>([]);

  useEffect(() => {
    categoriesStore.current.getCategories().then(setCategories);
  }, []);
  return (
    <Grid
      container
      sx={{ p: 2, minHeight: '100%', minWidth: '100%'}}
      spacing={1}
    >
      <Grid item xs={12}>
        <CategoriesAppBar />
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
          <Grid container spacing={1}>
            {categories.map(category => (
            <Grid item key={category.id}>
              <Chip
                color="info"
                key={category.id}
                label={`${category.id} ${category.categoryName}`}
              />
            </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
