import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import teal from '@mui/material/colors/teal';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ReactDisks from 'react-disks';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: teal[500],
      light: teal[100],
      dark: teal[800]
    }
  },
});

function generateRandomWords(wordsList, numberOfWords, lettersPerWord) {
  const words = new Set();
  while (words.size < numberOfWords) {
    const word = wordsList[Math.floor(Math.random() * wordsList.length)];
    if (word.length === lettersPerWord) {
      words.add(word);
    }
  }
  return Array.from(words);
}

function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

function App() {
  const [wordsList, setWordsList] = useState(null);
  const [disksText, setDisksText] = useState(null);
  const [numberOfDisks, setNumberOfDisks] = useState(7);
  const [lettersPerDisk, setLettersPerDisk] = useState(8);
  
  useEffect(() => {
    const words = require('random-words');
    setWordsList(words.wordList);
  }, []);
  
  useEffect(() => {
    if (wordsList) {
      const words = generateRandomWords(wordsList, lettersPerDisk, numberOfDisks);
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i].split('');
      }
      setDisksText(transpose(words));
    }
  }, [wordsList, numberOfDisks, lettersPerDisk]);
  
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="relative">
            <Toolbar>
              <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
                Word Disks
              </Typography>
              <Button href="https://mh11wi.github.io" color="inherit">Home</Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Box role="main" sx={{ flexGrow: 1, height: "calc(100% - 64px)"}}>
          <ReactDisks 
            disksText={disksText}
            theme={theme.palette.primary}
          />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
