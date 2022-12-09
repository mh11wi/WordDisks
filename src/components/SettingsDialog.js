import React from 'react';
import {
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle,
  Slider,
  Switch,
  Typography
} from '@mui/material';

const wordsMarks = [
  { value: 2, label: '2' },
  { value: 4, label: '4' },
  { value: 6, label: '6' },
  { value: 8, label: '8' },
];

const disksMarks = [
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
];

const SettingsDialog = (props) => {
  const onWordsChange = (event, newValue) => {
    props.setLettersPerDisk(newValue);
  }
  
  const onDisksChange = (event, newValue) => {
    props.setNumberOfDisks(newValue);
  }
  
  const onUppercaseChange = (event, newValue) => {
    props.setUseUppercase(newValue);
  }
  
  return (
    <Dialog
      aria-labelledby="settings-dialog-title"
      aria-describedby="settings-dialog-content"
      fullWidth={true}
      maxWidth="sm"
      open={props.open} 
      onClose={props.onClose}
    >
      <DialogTitle id="settings-dialog-title">Settings</DialogTitle>
      <DialogContent id="settings-dialog-content" dividers={true}>
        <DialogContentText component="div" sx={{ mb: 1 }}>
          <Typography id="words-slider">
            Number of words
          </Typography>
          <Slider 
            aria-labelledby="words-slider"
            value={props.lettersPerDisk}
            onChangeCommitted={onWordsChange}
            step={null}
            min={2}
            max={8}
            marks={wordsMarks}
          />
        </DialogContentText>
        <DialogContentText component="div" sx={{ mb: 1 }}>
          <Typography id="disks-slider">
            Number of disks
          </Typography>
          <Slider 
            aria-labelledby="disks-slider"
            value={props.numberOfDisks}
            onChangeCommitted={onDisksChange}
            step={null}
            min={3}
            max={7}
            marks={disksMarks}
          />
        </DialogContentText>
        <DialogContentText component="div">
          <Typography id="uppercase-switch">
            Uppercase letters
          </Typography>
          <Switch
            inputProps={{ 'aria-labelledby': 'uppercase-switch' }}
            checked={props.useUppercase}
            onChange={onUppercaseChange}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;
