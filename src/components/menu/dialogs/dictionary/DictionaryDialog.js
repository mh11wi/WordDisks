import { forwardRef, useContext, useImperativeHandle, useState } from 'react';
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
import WordDetails from 'components/menu/dialogs/dictionary/WordDetails';
import { transpose } from 'helpers/game';
import { GameContext } from 'src/App';


const DictionaryDialog = forwardRef((props, ref) => {
  const theme = useTheme();
  const { wordsList, rotatedDisksText } = useContext(GameContext);
  const [data, setData] = useState(null);
  const [definitions, setDefinitions] = useState(new Map());
  
  useImperativeHandle(ref, () => {
    return {
      updateData() {
        const words = [];
        const letterMatrix = transpose(rotatedDisksText);
        for (let i = 0; i < letterMatrix.length; i++) {
          const word = letterMatrix[i].join('');
          
          let options;
          if (wordsList.includes(word)) {
            options = { inList: true, definition: definitions.get(word) };
          } else {
            options = { inList: false }
          }
          
          words.push({ word, options });
        }
        
        setData(words);
      },
    };
  }, [wordsList, rotatedDisksText]);
  
  const updateDefinitions = (k, v) => {
    setDefinitions(definitions.set(k, v));
  }
  
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
        {data &&
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
                {data.map((row, index) => {
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
                        updateDefinitions={updateDefinitions}
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
});

export default DictionaryDialog;