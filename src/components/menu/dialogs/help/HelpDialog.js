import { useContext } from 'react';
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
import { 
  FastForward,
  Settings
} from '@mui/icons-material';
import { GameContext } from 'src/App';


const HelpDialog = (props) => {
  const { gameMode, useSwipe, timerStarted } = useContext(GameContext);
  
  let instructions;
  if (useSwipe) {
    instructions = "You can rotate a disk by tapping on it, and then swiping left or right anywhere on the screen.";
  } else {
    instructions = "You can rotate a disk by clicking on it, and then clicking either the clockwise or counterclockwise arrows that appear.";
  }
  
  const ChallengeText = () => {
    if (timerStarted) {
      return (
        <span>Keep going! Try to solve {props.challengeTargetWins} puzzles as quickly as possible.</span>
      );
    } else {
      return (
        <span>How quickly can you solve {props.challengeTargetWins} puzzles? Click <strong>START</strong> to begin.</span>
      );
    }
  }
  
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
      <DialogContent id="help-dialog-content" dividers={true} sx={{ p: 0 }}>
        <DialogContentText component="div">
          <List>
            <ListItem>
              <ListItemText>
                Rotate the disks so every column of letters spells a valid word in my list.
              </ListItemText>
            </ListItem>
            
            <ListItem>
              <ListItemText>{ instructions }</ListItemText>
            </ListItem>

            {gameMode === 'unlimited' && 
              <ListItem alignItems="flex-start" sx={{ flexDirection: 'column' }}>
                <ListItemText>
                  Play as much as you like! Each game is randomly generated, so the fun is endless. When you are ready to try another, use the following buttons:
                </ListItemText>
                <List>
                  <ListItem sx={{ py: 0 }}>
                    <ListItemIcon>
                      <Settings />
                    </ListItemIcon>
                    <ListItemText primary="Change the game settings/difficulty" />
                  </ListItem>
                  <ListItem sx={{ py: 0 }}>
                    <ListItemIcon>
                      <FastForward />
                    </ListItemIcon>
                    <ListItemText primary="Start a new game with the same settings" />
                  </ListItem>
                </List>
              </ListItem>
            }
            
            {gameMode === 'challenge' && 
              <ListItem>
                <ListItemText>
                  <ChallengeText />
                </ListItemText>
              </ListItem>
            }
          </List>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <DialogContentText sx={{ ml: 1, flexGrow: 1 }}>
          <Link href="https://mh11wi.github.io/privacy-policy.html">Terms & Privacy Policy</Link>
        </DialogContentText>
        <Button onClick={props.onClose}>{(timerStarted || gameMode === 'unlimited') ? 'Close' : 'Start'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HelpDialog;
