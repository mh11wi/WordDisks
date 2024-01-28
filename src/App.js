import React, { useEffect, useRef, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, grey, teal } from '@mui/material/colors';
import Box from '@mui/material/Box';
import party from 'party-js';
import AdSense from 'react-adsense';
import ReactDisks from 'react-disks';
import MenuBar from './components/MenuBar';
import NewGameButton from './components/NewGameButton';
import ConsecutiveSnackbars from './components/ConsecutiveSnackbars';
import useWindowOrientation from './hooks/useWindowOrientation';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      light: teal[100],
      main: teal[500],
      dark: teal[800]
    },
    secondary: {
      light: grey[50],
      main: grey[300],
      dark: grey[700]
    },
    success: {
      light: green[50],
      main: green[300],
      dark: green[700]
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

function isTouchDevice() {
  return ('ontouchstart' in window)
}

function App() {
  const loadingRef = useRef(0);
  const [wordsList, setWordsList] = useState(null);
  const [disksText, setDisksText] = useState(null);
  const [rotatedDisksText, setRotatedDisksText] = useState(null);
  const [numberOfDisks, setNumberOfDisks] = useState(parseInt(localStorage.getItem('wd-numberOfDisks')) || 3);
  const [lettersPerDisk, setLettersPerDisk] = useState(parseInt(localStorage.getItem('wd-lettersPerDisk')) || 4);
  const [useUppercase, setUseUppercase] = useState(localStorage.getItem('wd-useUppercase') === 'true');
  const [useSwipeMode, setUseSwipeMode] = useState(
    localStorage.getItem('wd-useSwipeMode') ? localStorage.getItem('wd-useSwipeMode') === 'true' : isTouchDevice()
  );
  const [unlimitedStats, setUnlimitedStats] = useState([
    parseInt(localStorage.getItem('wd-unlimitedStats-3')) || 0,
    parseInt(localStorage.getItem('wd-unlimitedStats-4')) || 0,
    parseInt(localStorage.getItem('wd-unlimitedStats-5')) || 0,
    parseInt(localStorage.getItem('wd-unlimitedStats-6')) || 0,
    parseInt(localStorage.getItem('wd-unlimitedStats-7')) || 0
  ]);
  const [hasWon, setHasWon] = useState(false);
  const [definitions, setDefinitions] = useState(new Map());
  const [snackPack, setSnackPack] = useState([]);
  const { orientation, resizing } = useWindowOrientation();
  
  useEffect(() => {
    async function fetchWords() {
      const words = await import('random-words');
      words.wordList.splice(6, 1, 'rebel');
      words.wordList.splice(7, 1, 'treat');
      words.wordList.splice(9, 1, 'forever');
      words.wordList.splice(15, 1, 'and');
      words.wordList.splice(292, 1, 'turkey');
      words.wordList.splice(323, 1, 'giraffe');
      words.wordList.splice(591, 1, 'fan');
      words.wordList.splice(747, 1, 'gem');
      words.wordList.splice(885, 1, 'aunt');
      words.wordList.splice(992, 1, 'turtle');
      words.wordList.splice(1351, 1, 'penguin');
      words.wordList.splice(1458, 1, 'peacock');
      words.wordList.splice(1521, 1, 'sloth');
      words.wordList.splice(1703, 1, 'goat');
      words.wordList.splice(1720, 1, 'code');
      words.wordList.splice(1734, 1, 'bun');
      words.wordList.splice(1783, 1, 'tiger');
      words.wordList.splice(1848, 1, 'mug');
      words.wordList.splice(1951, 1, 'bed');
      setWordsList(words.wordList);
    }
    
    fetchWords();
  }, []);
  
  useEffect(() => {
    if (wordsList) {
      let game;
      if (loadingRef.current < 2) {
        const params = new URLSearchParams(window.location.search);
        const urlDisks = params.get('disks');
        
        try {
          if (!urlDisks) {
            throw new Error('No game provided.');
          }
          
          const disks = urlDisks.split('_');
          if (disks.length < 3 || disks.length > 7) {
            throw new Error('Invalid number of disks.');
          }
          
          const numberOfColumns = disks[0].length;
          if (numberOfColumns !== 2 &&  numberOfColumns !== 4 && numberOfColumns !== 6 && numberOfColumns !== 8) {
            throw new Error('Invalid number of words.');
          }
          
          game = disks.map((disk) => {
            const columns = disk.toLowerCase().split('');
            if (columns.length !== numberOfColumns) {
              throw new Error('Inconsistent number of words.');
            }
            
            return columns.map((column) => {
              if (!column.match(/[a-z]/i)) {
                throw new Error('Invalid disk contents.');
              }
              return column;
            });
          });
          
          setNumberOfDisks(game.length);
          setLettersPerDisk(game[0].length);
        } catch (error) {
          if (loadingRef.current === 0) {
            console.log(`${error.message} Generating random game...`);
          }
        } finally {
          loadingRef.current++;
        }
      }
      
      if (!game) {
        game = newGame(wordsList, lettersPerDisk, numberOfDisks);
      }
      
      
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
      updateUnlimitedStats();
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
      beforeAd: () => {
        document.querySelectorAll('.adsbygoogle[data-slotcar-interstitial="true"], .adsbygoogle[data-slotcar-interstitial="true"] *').forEach(function(el) {
          if (CSS.supports("height: 100dvh")) {
            el.style.width = "100dvw";
            el.style.height = "100dvh";
          } else { 
            el.style.width = "100vw";
            el.style.height = "100vh";
          }
        });
      }
    });
    
    const game = newGame(wordsList, lettersPerDisk, numberOfDisks);
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
  
  const handleChangeUseSwipeMode = (val) => {
    setUseSwipeMode(val);
    localStorage.setItem('wd-useSwipeMode', val);
  }
  
  const updateUnlimitedStats = () => {
    const newStats = unlimitedStats.slice();
    const unlimitedWins = newStats.reduce((partialSum, a) => partialSum + a, 0) + 1;
    const achievementThresholds = [1, 5, 10, 20, 50, 100];
    
    const val = ++newStats[numberOfDisks - 3];
    setUnlimitedStats(newStats);
    localStorage.setItem('wd-unlimitedStats-' + numberOfDisks, val);
    
    if (achievementThresholds.includes(unlimitedWins)) {
      let message = `Win ${unlimitedWins} game${unlimitedWins == 1 ? '' : 's'}`;
      if (unlimitedWins == 1) {
        message += " - Nicely done!";
      } else if (unlimitedWins == 5 && localStorage.getItem('wd-numberOfDisks') == null) {
        message += " - Impressive! Why not add another disk?";
      }
      
      setSnackPack((prev) => [...prev, { 
        message: message, 
        key: new Date().getTime() 
      }]);
    }
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
  
    const getQueryString = () => {
    if (!disksText) {
      return '';
    }
    
    const disks = disksText.map((disk) => disk.join('')).join('_');
    return `?disks=${disks}`;
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
            useSwipeMode={useSwipeMode}
            setUseSwipeMode={handleChangeUseSwipeMode}
            getColumnWords={getColumnWords}
            updateDefinitions={updateDefinitions}
            getQueryString={getQueryString}
            unlimitedStats={unlimitedStats}
          />
          <Box className={`Game ${useUppercase ? 'uppercase': 'lowercase'}`}>
            <ReactDisks 
              disksText={disksText}
              theme={theme.palette.primary}
              onRotate={debounce(onRotate, 500)}
              disabled={hasWon}
              swipeMode={useSwipeMode}
            />
            <NewGameButton handleClick={handleClickNewGame} doTransition={!resizing} doPulsate={hasWon} />
            <ConsecutiveSnackbars snackPack={snackPack} setSnackPack={setSnackPack} />
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
