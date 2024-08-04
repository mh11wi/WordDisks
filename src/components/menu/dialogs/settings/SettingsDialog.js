import { useContext } from 'react';
import { useTheme } from '@mui/material/styles';
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
import { isTouchDevice } from 'helpers/app';
import { diskMarks, columnMarks } from 'helpers/config';
import { GameContext, ColorModeContext } from 'src/App';


const SettingsDialog = (props) => {
  const theme = useTheme();
  const { gameMode, useUppercase, handleChangeUseUppercase, useSwipe, handleChangeUseSwipe } = useContext(GameContext);
  const colorMode = useContext(ColorModeContext);
  
  const onDisksChange = (event, newValue) => {
    props.setNumberOfDisks(newValue);
  }
  
  const onColumnsChange = (event, newValue) => {
    props.setNumberOfColumns(newValue);
  }
  
  const onUppercaseChange = (event, newValue) => {
    handleChangeUseUppercase(newValue);
  }
  
  const onSwipeChange = (event, newValue) => {
    handleChangeUseSwipe(newValue);
  }
  
  const onDarkThemeChange = (event, newValue) => {
    colorMode.toggleColorMode(newValue ? 'dark' : 'light');
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
        {gameMode === 'unlimited' &&
          <DialogContentText component="div" sx={{ mb: 1 }}>
            <Typography id="disks-slider">
              Number of disks
            </Typography>
            <Slider 
              aria-labelledby="disks-slider"
              value={props.numberOfDisks}
              onChangeCommitted={onDisksChange}
              step={null}
              min={diskMarks[0].value}
              max={diskMarks[diskMarks.length - 1].value}
              marks={diskMarks}
            />
          </DialogContentText>
        }
      
        {gameMode === 'unlimited' &&
          <DialogContentText component="div" sx={{ mb: 1 }}>
            <Typography id="columns-slider">
              Number of columns
            </Typography>
            <Slider 
              aria-labelledby="columns-slider"
              value={props.numberOfColumns}
              onChangeCommitted={onColumnsChange}
              step={null}
              min={columnMarks[0].value}
              max={columnMarks[columnMarks.length - 1].value}
              marks={columnMarks}
            />
          </DialogContentText>
        }
        
        <DialogContentText component="div">
          <Typography id="uppercase-switch">
            Uppercase letters
          </Typography>
          <Switch
            inputProps={{ 'aria-labelledby': 'uppercase-switch' }}
            checked={useUppercase}
            onChange={onUppercaseChange}
          />
        </DialogContentText>
        
        <DialogContentText component="div" sx={{ pt: 2 }}>
          <Typography id="dark-theme-switch">
            Dark theme
          </Typography>
          <Switch
            inputProps={{ 'aria-labelledby': 'dark-theme-switch' }}
            checked={theme.palette.mode === 'dark'}
            onChange={onDarkThemeChange}
          />
        </DialogContentText>
        
        {isTouchDevice() && 
          <DialogContentText component="div" sx={{ pt: 2 }}>
            <Typography id="swipe-mode-switch">
              Swipe to rotate
            </Typography>
            <Switch
              inputProps={{ 'aria-labelledby': 'swipe-mode-switch' }}
              checked={useSwipe}
              onChange={onSwipeChange}
            />
          </DialogContentText>
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;
