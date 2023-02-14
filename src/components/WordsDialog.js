import React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Button,
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle,
  Paper,
  Table, 
  TableBody, 
  TableCell,
  TableContainer,
  TableHead, 
  TableRow 
} from '@mui/material';
import WordDetails from './WordDetails';


const WordsDialog = (props) => {
  const theme = useTheme();
  return (
    <Dialog
      aria-labelledby="words-dialog-title"
      aria-describedby="words-dialog-content"
      fullWidth={true}
      maxWidth="sm"
      open={props.open} 
      onClose={props.onClose}
    >
      <DialogTitle id="words-dialog-title">Dictionary</DialogTitle>
      <DialogContent id="words-dialog-content" dividers={true}>
        {props.data &&
          <TableContainer component={Paper}>
            <Table aria-label="Table of Words" align="center">
              <TableHead sx={{ backgroundColor: theme.palette.action.hover }}>
                <TableRow>
                  <TableCell>Column</TableCell>
                  <TableCell>Word</TableCell>
                  <TableCell>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.data.map((row, index) => {
                  return (
                    <TableRow 
                      key={index}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        backgroundColor: row.options.inList ? theme.palette.success.light : 'inherit',
                        td: { color: row.options.inList ? theme.palette.success.dark : 'inherit' }
                      }}
                    >
                      <WordDetails 
                        index={index + 1}  
                        word={row.word} 
                        options={row.options} 
                        updateDefinitions={props.updateDefinitions}
                      />
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default WordsDialog;