import { createContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { green, grey, teal } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import AdSense from 'react-adsense';
import MenuBar from 'components/menu/MenuBar';
import UnlimitedMode from 'components/game/modes/unlimited/UnlimitedMode';
import ChallengeMode from 'components/game/modes/challenge/ChallengeMode';
import useWindowOrientation from 'hooks/useWindowOrientation';
import { isTouchDevice, getPageScale } from 'helpers/app';
import { diskMarks, columnMarks } from 'helpers/config';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'src/App.css';


const adStyle = {
  display: 'block',
  width: 'calc(100% - 1rem)',
  height: 'calc(100% - 1rem)',
  margin: '0.5rem'
};

export const GameContext = createContext();
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function WordDisks() {
  const theme = useTheme();
  const { orientation, resizing } = useWindowOrientation();
  
  // Game Context State
  const [gameMode, setGameMode] = useState(null);
  const [wordsList, setWordsList] = useState(null);
  const [disksText, setDisksText] = useState(null);
  const [rotatedDisksText, setRotatedDisksText] = useState(null);
  const [useUppercase, setUseUppercase] = useState(localStorage.getItem('wd-useUppercase') === 'true');
  const [useSwipe, setUseSwipe] = useState(
    localStorage.getItem('wd-useSwipeMode') ? localStorage.getItem('wd-useSwipeMode') === 'true' : isTouchDevice()
  );
  const [timerStatus, setTimerStatus] = useState(null);
  const [showAds, setShowAds] = useState(false);
  
  // Unlimited Mode State
  const [urlGame, setUrlGame] = useState(null);
  const [unlimitedDisks, setUnlimitedDisks] = useState(parseInt(localStorage.getItem('wd-numberOfDisks')) || 3);
  const [unlimitedColumns, setUnlimitedColumns] = useState(parseInt(localStorage.getItem('wd-lettersPerDisk')) || 4);
  const [unlimitedStats, setUnlimitedStats] = useState(diskMarks.map((mark) => parseInt(localStorage.getItem(`wd-unlimitedStats-${mark.value}`)) || 0));
  
  // Challenge Mode State
  const [challengeDisks, setChallengeDisks] = useState(3);
  const [challengeColumns, setChallengeColumns] = useState(4);
  const [challengeTargetWins, setChallengeTargetWins] = useState(10);
  const [challengeStats, setChallengeStats] = useState(diskMarks.map((mark) => {
    return {
      count: parseInt(localStorage.getItem(`wd-challengeStats-${mark.value}`)) || 0,
      average: parseFloat(localStorage.getItem(`wd-challengeAverage-${mark.value}`)) || 0,
      best: parseFloat(localStorage.getItem(`wd-challengeBest-${mark.value}`)) || 0,
    }
  }));
  
  useEffect(() => {
    async function fetchWords() {
      const words = await import('random-words');
      words.wordList.splice(6, 1, 'rebel');
      words.wordList.splice(7, 1, 'treat');
      words.wordList.splice(9, 1, 'forever');
      words.wordList.splice(15, 1, 'and');
      words.wordList.splice(17, 1, 'guy');
      words.wordList.splice(19, 1, 'swear');
      words.wordList.splice(20, 1, 'hey');
      words.wordList.splice(21, 1, 'need');
      words.wordList.splice(23, 1, 'nurse');
      words.wordList.splice(28, 1, 'the');
      words.wordList.splice(37, 1, 'bass');
      words.wordList.splice(46, 1, 'kiss');
      words.wordList.splice(49, 1, 'boots');
      words.wordList.splice(57, 1, 'crush');
      words.wordList.splice(64, 1, 'fault');
      words.wordList.splice(66, 1, 'bye');
      words.wordList.splice(68, 1, 'feather');
      words.wordList.splice(69, 1, 'wake');
	  words.wordList.splice(72, 1, 'witch');
      words.wordList.splice(79, 1, 'broom');
	  words.wordList.splice(90, 1, 'freak');
	  words.wordList.splice(93, 1, 'hip');
	  words.wordList.splice(96, 1, 'dip');
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
    window.adConfig({preloadAdBreaks: 'on'});
    setTimeout(function() { setShowAds(true) }, 120000);
  }, []);
  
  useEffect(() => {
    if (wordsList) {
      const params = new URLSearchParams(window.location.search);
      
      try {
        if (params.get('disks')) {
          // Load a specific puzzle if valid
          const disks = params.get('disks').split('_');
          if (!diskMarks.map((mark) => mark.value).includes(disks.length)) {
            throw new Error('Invalid number of disks.');
          }
          
          const numberOfColumns = disks[0].length;
          if (!columnMarks.map((mark) => mark.value).includes(numberOfColumns)) {
            throw new Error('Invalid number of columns.');
          }
          
          const game = disks.map((disk) => {
            const columns = disk.toLowerCase().split('');
            if (columns.length !== numberOfColumns) {
              throw new Error('Inconsistent number of columns.');
            }
            
            return columns.map((column) => {
              if (!column.match(/[a-z]/i)) {
                throw new Error('Invalid disk contents.');
              }
              return column;
            });
          });
          
          setGameMode('unlimited');
          setUnlimitedDisks(game.length);
          setUnlimitedColumns(game[0].length);
          setUrlGame(game);
          
        } else if (params.get('challenge')) {
          // Load a specific challenge if valid
          const challenge = params.get('challenge').split('_');
          if (challenge.length !== 3) {
            throw new Error('Invalid number of challenge parameters.');
          }
          
          const numberOfDisks = parseInt(challenge[0]);
          if (isNaN(numberOfDisks) || !diskMarks.map((mark) => mark.value).includes(numberOfDisks)) {
            throw new Error('Invalid number of disks for challenge.');
          }
          
          const numberOfColumns = parseInt(challenge[1]);
          if (isNaN(numberOfColumns) || !columnMarks.map((mark) => mark.value).includes(numberOfColumns)) {
            throw new Error('Invalid number of columns for challenge.');
          }
          
          const numberOfWins = parseInt(challenge[2]);
          if (isNaN(numberOfWins) || numberOfWins <= 1) {
            throw new Error('Invalid number of games for challenge.');
          }
          
          setGameMode('challenge');
          setChallengeDisks(numberOfDisks);
          setChallengeColumns(numberOfColumns);
          setChallengeTargetWins(numberOfWins);
        
        } else {
          // Load unlimited mode otherwise
          setGameMode('unlimited');
        }
      } catch (error) {
        console.log(`${error.message} Generating random game in Unlimited Mode...`);
        setGameMode('unlimited');
      }
    }
  }, [wordsList]);
  
  const handleChangeUnlimitedDisks = (val) => {
    setUnlimitedDisks(val);
    localStorage.setItem('wd-numberOfDisks', val);
  }
  
  const handleChangeUnlimitedColumns = (val) => {
    setUnlimitedColumns(val);
    localStorage.setItem('wd-lettersPerDisk', val);
  }
  
  const handleChangeUseUppercase = (val) => {
    setUseUppercase(val);
    localStorage.setItem('wd-useUppercase', val);
  }
  
  const handleChangeUseSwipe = (val) => {
    setUseSwipe(val);
    localStorage.setItem('wd-useSwipeMode', val);
  }
  
  return (
    <Box className="App" sx={{ bgcolor: theme.palette.background.default, boxShadow: `inset 10000px 10000px ${theme.palette.action.hover}` }}>
      {orientation === 'landscape' && !resizing && 
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
      <Box role="main" className="Main" sx={{ bgcolor: theme.palette.background.default }}>
        <GameContext.Provider 
          value={{
            gameMode,
            wordsList, 
            disksText, 
            setDisksText, 
            rotatedDisksText, 
            setRotatedDisksText, 
            useUppercase, 
            handleChangeUseUppercase, 
            useSwipe, 
            handleChangeUseSwipe,
            timerStatus,
            setTimerStatus,
            showAds
          }}
        >
          {gameMode &&
            <MenuBar 
              unlimitedDisks={unlimitedDisks}
              setUnlimitedDisks={handleChangeUnlimitedDisks}
              unlimitedColumns={unlimitedColumns}
              setUnlimitedColumns={handleChangeUnlimitedColumns}
              unlimitedStats={unlimitedStats}
              challengeDisks={challengeDisks}
              challengeColumns={challengeColumns}
              challengeTargetWins={challengeTargetWins}
              challengeStats={challengeStats}
            />
          }
          
          {gameMode === 'unlimited' &&
            <UnlimitedMode
              firstGame={urlGame}
              stats={unlimitedStats}
              setStats={setUnlimitedStats}
              numberOfDisks={unlimitedDisks}
              numberOfColumns={unlimitedColumns}
              buttonTransition={!resizing}
            />
          }
          
          {gameMode === 'challenge' && 
            <ChallengeMode 
              stats={challengeStats}
              setStats={setChallengeStats}
              numberOfDisks={challengeDisks}
              numberOfColumns={challengeColumns}
              targetWins={challengeTargetWins}
              buttonTransition={!resizing}
            />
          }
        </GameContext.Provider>
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
            responsive={getPageScale() == 1}
          />
        </Box>
      }
    </Box>
  );
}

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(localStorage.getItem('wd-colorMode') || (prefersDarkMode ? 'dark' : 'light'));
  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
  }), []);

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        light: teal[100],
        main: teal[500],
        dark: teal[800]
      },
      secondary: {
        light: grey[50],
        main: grey[300],
        dark: grey[600]
      },
      success: {
        light: green[50],
        main: green[300],
        secondary: green[500],
        dark: green[700]
      }
    },
  }), [mode]);
  
  useEffect(() => {
	document.body.style.backgroundColor = theme.palette.background.default;
    localStorage.setItem('wd-colorMode', mode);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <WordDisks />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
