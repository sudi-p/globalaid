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

export default function Filter() {
  const [checkbox, setCheckbox] = React.useState({
    'fullTime': false,
    'partTime': false,
    'weekEnds': false,
    'In-Person': false,
    'Remote': false,
    'Hybrid': false,
  });
  const clearFilters = () => {
    setCheckbox({
      'fullTime': false,
      'partTime': false,
      'weekEnds': false,
      'morning': false,
      'afternoon': false,
      'overnight': false,
    })
  }
  const handleCheckbox = (event) => {
    setCheckbox({
      ...checkbox,
      [event.target.name]: event.target.checked,
    });
  };
  const { fullTime, partTime, weekEnds, morning, afternoon, overnight } = checkbox;
  return (
    <Paper variant="outlined" className="p-7 w-80">
      <div className="flex justify-between items-center mb-2">
        <div className="text-lg font-bold">Filter By</div>
        <div onClick={clearFilters} className="cursor-pointer text-green-500">Reset Filters</div>
      </div>
      <Stack spacing={3}>
        <FormGroup>
          <FormLabel component="legend">Job Type</FormLabel>
          <FormControlLabel
            control={
              <Checkbox checked={fullTime} onChange={handleCheckbox} name="Full-Time" />
            }
            label="Full-Time"
          />
          <FormControlLabel
            control={
              <Checkbox checked={partTime} onChange={handleCheckbox} name="Part-Time" />
            }
            label="Part-Time"
          />
          <FormControlLabel
            control={
              <Checkbox checked={weekEnds} onChange={handleCheckbox} name="Permanent" />
            }
            label="Permanent"
          />
          <FormControlLabel
            control={
              <Checkbox checked={fullTime} onChange={handleCheckbox} name="Temporary" />
            }
            label="Temporary"
          />
          <FormControlLabel
            control={
              <Checkbox checked={fullTime} onChange={handleCheckbox} name="Casual" />
            }
            label="Casual"
          />
        </FormGroup>
        
        <FormGroup>
          <FormLabel component="legend">Job Site</FormLabel>
          <FormControlLabel
            control={
              <Checkbox checked={morning} onChange={handleCheckbox} name="In-Person" />
            }
            label="In-Person"
          />
          <FormControlLabel
            control={
              <Checkbox checked={afternoon} onChange={handleCheckbox} name="Remote" />
            }
            label="Remote"
          />
          <FormControlLabel
            control={
              <Checkbox checked={overnight} onChange={handleCheckbox} name="Hybrid" />
            }
            label="Hybrid"
          />
        </FormGroup>
      </Stack>
    </Paper>
  )
}
