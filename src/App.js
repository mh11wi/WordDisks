import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import teal from '@mui/material/colors/teal';
import Box from '@mui/material/Box';
import party from "party-js";
import ReactDisks from 'react-disks';
import MenuBar from './components/MenuBar';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
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

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function generateRandomWords(wordsList, numberOfWords, lettersPerWord) {
  const words = new Set();
  while (words.size < numberOfWords) {
    const word = wordsList[getRandomInt(wordsList.length)];
    if (word.length === lettersPerWord) {
      words.add(word);
    }
  }
  return Array.from(words);
}

function toLetterMatrix(words) {
  return words.map((word) => word.split(''));
}

function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

function rotate(array) {
  return array.push(array.shift());
}

function randomRotate(matrix) {
  return matrix.map((row) => {
    const numberOfRotations = getRandomInt(row.length);
    for (let i=0; i < numberOfRotations; i++) {
      rotate(row);
    }
    return row;
  });
}

function toWords(letterMatrix) {
  return letterMatrix.map((letters) => letters.join(''));
}

function isSolved(wordsList, answer) {
  const letterMatrix = transpose(answer);
  const words = toWords(letterMatrix);
  return words.every((word) => wordsList.includes(word));
}

function newGame(wordsList, numberOfWords, lettersPerWord) {
  const words = generateRandomWords(wordsList, numberOfWords, lettersPerWord);
  const letterMatrix = toLetterMatrix(words);
  const disksText = transpose(letterMatrix);
  randomRotate(disksText);
  
  if (isSolved(wordsList, disksText)) {
    return newGame(wordsList, numberOfWords, lettersPerWord);
  }
  
  return disksText;
}

function App() {
  const [wordsList, setWordsList] = useState(null);
  const [disksText, setDisksText] = useState(null);
  const [numberOfDisks, setNumberOfDisks] = useState(5);
  const [lettersPerDisk, setLettersPerDisk] = useState(4);
  const [useUppercase, setUseUppercase] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  
  useEffect(() => {
    const words = require('random-words');
    setWordsList(words.wordList);
  }, []);
  
  useEffect(() => {
    if (wordsList) {
      setDisksText(newGame(wordsList,lettersPerDisk, numberOfDisks));
      setHasWon(false);
    }
  }, [wordsList, numberOfDisks, lettersPerDisk]);
  
  useEffect(() => {
    if (hasWon) {
      const element = document.querySelector('.DisksContainer');
      party.confetti(element, {
        count: party.variation.range(50, 70),
      });
    }
  }, [hasWon]);
  
  const onRotate = (rotatedDisksText) => {
    setTimeout(() => setHasWon(isSolved(wordsList, rotatedDisksText)), 500);
  }
  
  const handleClickNewGame = () => {
    setDisksText(newGame(wordsList,lettersPerDisk, numberOfDisks));
    setHasWon(false);
  }
  
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <MenuBar 
            handleClickNewGame={handleClickNewGame}
            numberOfDisks={numberOfDisks}
            setNumberOfDisks={setNumberOfDisks}
            lettersPerDisk={lettersPerDisk}
            setLettersPerDisk={setLettersPerDisk}
            useUppercase={useUppercase}
            setUseUppercase={setUseUppercase}
            hasWon={hasWon}
          />
        </Box>
        <Box role="main" className={useUppercase ? 'uppercase': 'lowercase'} sx={{ flexGrow: 1, height: "calc(100% - 3rem)"}}>
          <ReactDisks 
            disksText={disksText}
            theme={theme.palette.primary}
            onRotate={onRotate}
            disabled={hasWon}
          />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
