import React, { ChangeEvent, useState } from 'react';
import {
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Stack,
  FormLabel
} from '@mui/material';
type FilterProps = {
  checkbox: any,
  setCheckbox: any,
}

export default function Filter({ checkbox, setCheckbox}: FilterProps) {
  const clearFilters = () => {
    setCheckbox({
      'fullTime': false,
      'partTime': false,
      'weekEnds': false,
      'permanent': false,
      'temporary': false,
      'casual': false,
      'inPerson': false,
      'remote': false,
      'hybrid': false,
    })
  }
  const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, checked } = event.target;
    setCheckbox((prevState) => {
      return{
      ...prevState,
      [name]: checked,
    }});
  };
  const { fullTime, partTime,permanent, temporary, casual, inPerson, remote, hybrid } = checkbox;
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
              <Checkbox checked={fullTime} onChange={handleCheckbox} name="fullTime" />
            }
            label="Full-Time"
          />
          <FormControlLabel
            control={
              <Checkbox checked={partTime} onChange={handleCheckbox} name="partTime" />
            }
            label="Part-Time"
          />
          <FormControlLabel
            control={
              <Checkbox checked={permanent} onChange={handleCheckbox} name="permanent" />
            }
            label="Permanent"
          />
          <FormControlLabel
            control={
              <Checkbox checked={temporary} onChange={handleCheckbox} name="temporary" />
            }
            label="Temporary"
          />
          <FormControlLabel
            control={
              <Checkbox checked={casual} onChange={handleCheckbox} name="casual" />
            }
            label="Casual"
          />
        </FormGroup>

        <FormGroup>
          <FormLabel component="legend">Job Site</FormLabel>
          <FormControlLabel
            control={
              <Checkbox checked={inPerson} onChange={handleCheckbox} name="inPerson" />
            }
            label="In-Person"
          />
          <FormControlLabel
            control={
              <Checkbox checked={remote} onChange={handleCheckbox} name="remote" />
            }
            label="Remote"
          />
          <FormControlLabel
            control={
              <Checkbox checked={hybrid} onChange={handleCheckbox} name="hybrid" />
            }
            label="Hybrid"
          />
        </FormGroup>
      </Stack>
    </Paper>
  )
}
