import React, { useState } from 'react';
import {
  Paper,
  FormGroup,
  FormControl,
  FormControlLabel,
  Checkbox,
  Stack,
  FormLabel
} from '@mui/material';
import styles from './styles/Filter.module.scss';

export default function Filter() {
  const [checkbox, setCheckbox] = React.useState({
    'fullTime': false,
    'partTime': false,
    'weekEnds': false,
    'morning': false,
    'afternoon': false,
    'overnight': false,
  });
  const handleCheckbox = (event) => {
    setCheckbox({
      ...checkbox,
      [event.target.name]: event.target.checked,
    });
  };
  const { fullTime, partTime, weekEnds, morning, afternoon, overnight } =  checkbox;
  return (
    <Paper variant="outlined" className={styles.filter}>
        
        <FormControl>
          <FormLabel component="legend">Filter</FormLabel>
          <Stack spacing={3}>
            <FormGroup>
              <FormLabel component="legend">Job Type</FormLabel>
              <FormControlLabel
                control={
                  <Checkbox checked={fullTime} onChange={handleCheckbox} name="fullTime" />
                }
                label="Full Time"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={partTime} onChange={handleCheckbox} name="partTime" />
                }
                label="Part Time"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={weekEnds} onChange={handleCheckbox} name="weekEnds" />
                }
                label="Only Weekends"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel component="legend">Shifts</FormLabel>
              <FormControlLabel
                control={
                  <Checkbox checked={morning} onChange={handleCheckbox} name="morning" />
                }
                label="Morning"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={afternoon} onChange={handleCheckbox} name="afternoon" />
                }
                label="Afternoon"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={overnight} onChange={handleCheckbox} name="overnight" />
                }
                label="Over Night"
              />
            </FormGroup>
          </Stack>
          
        </FormControl>  
    </Paper>
  )
}
