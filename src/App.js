import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, teal } from '@mui/material/colors';
import Box from '@mui/material/Box';
import party from 'party-js';
import AdSense from 'react-adsense';
import ReactDisks from 'react-disks';
import MenuBar from './components/MenuBar';
import NewGameButton from './components/NewGameButton';
import useWindowOrientation from './hooks/useWindowOrientation';
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
    },
    success: {
      light: green[50],
      main: green[500],
      dark: green[900]
    },
  },
});

const adStyle = {
  display: 'block',
  width: 'calc(100% - 1rem)',
  height: 'calc(100% - 1rem)',
  margin: '0.5rem'
};

function debounce(func, timeout) {
  let timer;
  return function(event) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(func, timeout, event);
  };
}

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
  const [rotatedDisksText, setRotatedDisksText] = useState(null);
  const [numberOfDisks, setNumberOfDisks] = useState(parseInt(localStorage.getItem('wd-numberOfDisks')) || 5);
  const [lettersPerDisk, setLettersPerDisk] = useState(parseInt(localStorage.getItem('wd-lettersPerDisk')) || 4);
  const [useUppercase, setUseUppercase] = useState(localStorage.getItem('wd-useUppercase') === 'true');
  const [hasWon, setHasWon] = useState(false);
  const [definitions, setDefinitions] = useState(new Map());
  const { orientation, resizing } = useWindowOrientation();
  
  useEffect(() => {
    const words = require('random-words');
    setWordsList(words.wordList);
  }, []);
  
  useEffect(() => {
    if (wordsList) {
      const game = newGame(wordsList,lettersPerDisk, numberOfDisks);
      setDisksText(game);
      setRotatedDisksText(game);
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
    setRotatedDisksText(rotatedDisksText);
    setHasWon(isSolved(wordsList, rotatedDisksText));
  }
  
  const handleClickNewGame = () => {
    window.adBreak({
      type: 'next',
      name: 'new-game',
    });
    
    const game = newGame(wordsList,lettersPerDisk, numberOfDisks);
    setDisksText(game);
    setRotatedDisksText(game);
    setHasWon(false);
  }
  
  const handleChangeNumberOfDisks = (val) => {
    setNumberOfDisks(val);
    localStorage.setItem('wd-numberOfDisks', val);
  }
  
  const handleChangeLettersPerDisk = (val) => {
    setLettersPerDisk(val);
    localStorage.setItem('wd-lettersPerDisk', val);
  }
  
  const handleChangeUseUppercase = (val) => {
    setUseUppercase(val);
    localStorage.setItem('wd-useUppercase', val);
  }
  
  const getColumnWords = () => {
    const columnWords = [];
    const letterMatrix = transpose(rotatedDisksText);
    for (let i=0; i < letterMatrix.length; i++) {
      const word = letterMatrix[i].join('');
      let options;
      if (wordsList.includes(word)) {
        options = { inList: true, definition: definitions.get(word) };
      } else {
        options = { inList: false }
      }
      columnWords.push({ word, options });
    }
    return columnWords;
  }
  
  const updateDefinitions = (k, v) => {
    setDefinitions(definitions.set(k, v));
  }
  
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {orientation === 'landscape'&& !resizing && 
          <Box className="vertical-ad-left">
            <AdSense.Google
              client="ca-pub-9808989635264198"
              slot="9091776362"
              style={adStyle}
              format=""
              responsive="true"
            />
          </Box>
        }
        <Box role="main" className="Main">
          <MenuBar 
            handleClickNewGame={handleClickNewGame}
            numberOfDisks={numberOfDisks}
            setNumberOfDisks={handleChangeNumberOfDisks}
            lettersPerDisk={lettersPerDisk}
            setLettersPerDisk={handleChangeLettersPerDisk}
            useUppercase={useUppercase}
            setUseUppercase={handleChangeUseUppercase}
            getColumnWords={getColumnWords}
            updateDefinitions={updateDefinitions}
          />
          <Box className={`Game ${useUppercase ? 'uppercase': 'lowercase'}`}>
            <ReactDisks 
              disksText={disksText}
              theme={theme.palette.primary}
              onRotate={debounce(onRotate, 500)}
              disabled={hasWon}
            />
            <NewGameButton handleClick={handleClickNewGame} doTransition={!resizing} doPulsate={hasWon} />
          </Box>
        </Box>
        {orientation === 'landscape' && !resizing && 
          <Box className="vertical-ad-right">
            <AdSense.Google
              client="ca-pub-9808989635264198"
              slot="6465613026"
              style={adStyle}
              format=""
              responsive="true"
            />
          </Box>
        }
        {orientation === 'portrait' && !resizing && 
          <Box className="horizontal-ad">
            <AdSense.Google
              client="ca-pub-9808989635264198"
              slot="2074941876"
              style={adStyle}
              format=""
              responsive="true"
            />
          </Box>
        }
      </ThemeProvider>
    </div>
  );
}

export default App;
