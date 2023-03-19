import React, { Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Link,
  MobileStepper,
  Paper
} from '@mui/material';
import {
  EmojiEvents,
  KeyboardArrowLeft, 
  KeyboardArrowRight, 
  Lightbulb,
  Quiz
} from '@mui/icons-material';

const steps = [
  {
    icon: ( <Lightbulb /> ),
    primary: 'Pro Tip',
    secondary: 'Look for an uncommon letter as a starting point. Focus on this column and try to find other letters in adjacent disks that could work with it. For example, the letter Q is typically followed by the letter U.'
  },
  {
    icon: ( <Quiz /> ),
    primary: 'Did You Know?',
    secondary: (
      <Fragment>
        I created a number variant to this game, where disks of numbers can be rotated to add up to a particular sum. If you are also a fan of number games, please check out <Link href="https://mh11wi.github.io/SumDisks/" target="_blank">Sum Disks</Link>!
      </Fragment>
    )
  },
  {
    icon: ( <Lightbulb /> ),
    primary: 'Pro Tip',
    secondary: 'What are common prefixes and suffixes you know? Look for these letter patterns in the first or last few disks, and try to group them in one column. For example, if the last disk contains the letter G it is possible that the target word ends in ING.'
  },
  {
    icon: ( <EmojiEvents /> ),
    primary: 'Keep Practicing',
    secondary: 'This game is a great way to test your vocabulary and exercise your brain! Practice at your own pace, or if you are up for a challenge, try increasing the number of disks or letters per disk.'
  }
];

const TipsDialog = (props) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  return (
    <Dialog
      aria-labelledby="tips-dialog-title"
      aria-describedby="tips-dialog-content"
      fullWidth={true}
      maxWidth="sm"
      open={props.open} 
      onClose={props.onClose}
    >
      <DialogTitle id="tips-dialog-title">Tips & Tidbits</DialogTitle>
      <DialogContent id="tips-dialog-content" dividers={true}>
        <Paper>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                  {steps[activeStep].icon}
                </Avatar>
              </ListItemAvatar>
              <ListItemText 
                primary={steps[activeStep].primary} 
                secondary={steps[activeStep].secondary}
              />
            </ListItem>
          </List>
          <MobileStepper
            position="static"
            steps={maxSteps}
            activeStep={activeStep}
            nextButton={
              <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                Next
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                <KeyboardArrowLeft />
                Back
              </Button>
            }
          />
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TipsDialog;