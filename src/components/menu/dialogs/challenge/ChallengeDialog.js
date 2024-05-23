import { useState } from 'react';
import {
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle,
  Slider,
  Typography
} from '@mui/material';
import { diskMarks, columnMarks, winMarks } from 'helpers/config';


const ChallengeDialog = (props) => {
  // State of dialog settings, only persisting to props on submit
  const [challengeDisks, setChallengeDisks] = useState(props.numberOfDisks);
  const [challengeColumns, setChallengeColumns] = useState(props.numberOfColumns);
  const [challengeTargetWins, setChallengeTargetWins] = useState(winMarks.map((mark) => mark.value).indexOf(props.targetWins));
  
  const scaledWinValue = (index) => {
    return winMarks[index].value;
  }
  
  const scaledWinMarks = winMarks.map((mark, index) => ({
    value: index,
    label: scaledWinValue(index)
  }));
  
  const onWinsChange = (event, newValue) => {
    setChallengeTargetWins(newValue);
  }
  
  const onDisksChange = (event, newValue) => {
    setChallengeDisks(newValue);
  }
  
  const onColumnsChange = (event, newValue) => {
    setChallengeColumns(newValue);
  }
  
  const handleClickCreate = () => {
    props.onCreate(challengeDisks, challengeColumns, scaledWinValue(challengeTargetWins));
  }
  
  return (
    <Dialog
      aria-labelledby="challenge-dialog-title"
      aria-describedby="challenge-dialog-content"
      fullWidth={true}
      maxWidth="sm"
      open={props.open} 
      onClose={props.onClose}
    >
      <DialogTitle id="challenge-dialog-title">Create Challenge</DialogTitle>
      <DialogContent id="challenge-dialog-content" dividers={true}>
        <DialogContentText component="div">
          <Typography id="wins-slider">
            Number of games
          </Typography>
          <Slider 
            aria-labelledby="wins-slider"
            value={challengeTargetWins}
            onChangeCommitted={onWinsChange}
            step={null}
            min={scaledWinMarks[0].value}
            max={scaledWinMarks[scaledWinMarks.length - 1].value}
            marks={scaledWinMarks}
            scale={scaledWinValue}
          />
        </DialogContentText>
        
        <DialogContentText sx={{ my: 2, fontWeight: 'bold' }}>
          Game Settings
        </DialogContentText>
        
        <DialogContentText component="div" sx={{ mb: 1 }}>
          <Typography id="disks-slider">
            Number of disks
          </Typography>
          <Slider 
            aria-labelledby="disks-slider"
            value={challengeDisks}
            onChangeCommitted={onDisksChange}
            step={null}
            min={diskMarks[0].value}
            max={diskMarks[diskMarks.length - 1].value}
            marks={diskMarks}
          />
        </DialogContentText>
      
        <DialogContentText component="div">
          <Typography id="columns-slider">
            Number of columns
          </Typography>
          <Slider 
            aria-labelledby="columns-slider"
            value={challengeColumns}
            onChangeCommitted={onColumnsChange}
            step={null}
            min={columnMarks[0].value}
            max={columnMarks[columnMarks.length - 1].value}
            marks={columnMarks}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChallengeDialog;
