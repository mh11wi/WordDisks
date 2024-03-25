import { useContext, useEffect, useRef, useState } from 'react';
import NewGameButton from 'components/game/modes/unlimited/NewGameButton';
import GameInterface from 'components/game/GameInterface';
import { GameContext } from 'src/App';


const UnlimitedMode = (props) => {
  const gameRef = useRef();
  const { disksText, setDisksText, setRotatedDisksText } = useContext(GameContext);
  const [pulsateButton, setPulsateButton] = useState(false);
  
  useEffect(() => {
    if (!disksText && props.firstGame) {
      setDisksText(props.firstGame);
      setRotatedDisksText(props.firstGame);
    } else {
      setPulsateButton(false);
      gameRef.current.loadNewGame(props.lettersPerDisk, props.numberOfDisks);
    }
  }, [props.firstGame, props.lettersPerDisk, props.numberOfDisks]);
  
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
    
    setPulsateButton(false);
    gameRef.current.loadNewGame(props.lettersPerDisk, props.numberOfDisks);
  }
  
  const updateStats = () => {
    const newStats = props.stats.slice();
    const unlimitedWins = newStats.reduce((partialSum, a) => partialSum + a, 0) + 1;
    const achievementThresholds = [1, 5, 10, 20, 50, 100];
    
    const val = ++newStats[props.numberOfDisks - 3];
    props.setStats(newStats);
    localStorage.setItem('wd-unlimitedStats-' + props.numberOfDisks, val);
    
    if (achievementThresholds.includes(unlimitedWins)) {
      let message = `Win ${unlimitedWins} game${unlimitedWins == 1 ? '' : 's'}`;
      if (unlimitedWins == 1) {
        message += " - Nicely done!";
      } else if (unlimitedWins == 5 && localStorage.getItem('wd-numberOfDisks') == null) {
        message += " - Impressive! Why not add another disk?";
      }
      
      gameRef.current.displaySnack(message);
    }
  }
  
  const handleWin = () => {
    setPulsateButton(true);
    updateStats();
  }
  
  return (
    <GameInterface
      ref={gameRef}
      handleWin={handleWin}
      actionButton={
        <NewGameButton handleClick={handleClickNewGame} doTransition={props.buttonTransition} doPulsate={pulsateButton} />
      }
    />
  );
};

export default UnlimitedMode;