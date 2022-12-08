import React from 'react';
import {
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { FastForward, Settings } from '@mui/icons-material';

const HelpDialog = (props) => {
  return (
    <Dialog
      aria-labelledby="help-dialog-title"
      aria-describedby="help-dialog-content"
      fullWidth={true}
      maxWidth="sm"
      open={props.open} 
      onClose={props.onClose}
    >
      <DialogTitle id="help-dialog-title">How To Play</DialogTitle>
      <DialogContent id="help-dialog-content" dividers={true} sx={{ p: 0, pl: 2 }}>
        <DialogContentText component="div">
          <List>
            <ListItem disablePadding>
              <ListItemText primary="Rotate the disks so every column of letters spell a valid word in my list." />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="You can rotate a disk by clicking on it, and then clicking either the clockwise or counterclockwise arrow." />
            </ListItem>
            <ListItem sx={{ mt: 1 }}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Open the settings menu to adjust the game" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FastForward />
              </ListItemIcon>
              <ListItemText primary="Start a new game with the same settings" />
            </ListItem>
          </List>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <DialogContentText sx={{ ml: 2, flexGrow: 1 }}>
          Like Word Disks? Try <Link href="https://mh11wi.github.io/SumDisks/" target="_blank">Sum Disks</Link>!
        </DialogContentText>
        <Button autoFocus onClick={props.onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HelpDialog;
