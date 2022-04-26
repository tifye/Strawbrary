import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

// https://stackoverflow.com/a/51395643/14918676
const useStyles = makeStyles(() => ({
  select: {
    '&:before': {
      borderColor: 'white',
    },
    '&:after': {
      borderColor: 'white',
    },
    '&:not(.Mui-disabled):hover::before': {
      borderColor: 'white',
    },
  },
  icon: {
    fill: 'white',
  },
  root: {
    color: 'white',
  },
}));

interface OrderBySelectProps {
  orderBy: string;
  setOrderBy: (value: string) => void;
}

export default function OrderBySelect(props: OrderBySelectProps) {
  const { orderBy, setOrderBy } = props;
  const classes = useStyles();
  return (
    <FormControl
      variant="filled"
      size="small"
      style={{ margin: '5px' }}
    >
      <InputLabel style={{ color: 'white' }} id="order-by-select">
        Order by
      </InputLabel>
      <Select
        labelId="order-by-select"
        id="order-by-select"
        value={orderBy}
        label="Order by"
        onChange={(e) => setOrderBy(e.target.value)}
        style={{ color: 'white' }}
        className={classes.select}
        inputProps={{
          classes: {
            icon: classes.icon,
            root: classes.root,
          },
        }}
      >
        <MenuItem value="relevance">Relevance</MenuItem>
        <MenuItem value="type">Type</MenuItem>
        <MenuItem value="categoryName">Category Name</MenuItem>
      </Select>
    </FormControl>
  );
}
