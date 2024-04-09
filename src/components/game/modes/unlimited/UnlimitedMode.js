import { useContext, useEffect, useRef, useState } from 'react';
import NewGameButton from 'components/game/modes/unlimited/NewGameButton';
import GameInterface from 'components/game/GameInterface';
import { getSum, showInterstitialAd } from 'helpers/app';
import { unlimitedThresholds } from 'helpers/config';
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
      gameRef.current.loadNewGame(props.numberOfColumns, props.numberOfDisks);
    }
  }, [props.firstGame, props.numberOfColumns, props.numberOfDisks]);
  
  const handleClickNewGame = () => {
    showInterstitialAd();
    setPulsateButton(false);
    gameRef.current.loadNewGame(props.numberOfColumns, props.numberOfDisks);
  }
  
  const updateStats = () => {
    const newStats = props.stats.slice();
    const unlimitedWins = getSum(newStats) + 1;
    
    const val = ++newStats[props.numberOfDisks - 3];
    props.setStats(newStats);
    localStorage.setItem('wd-unlimitedStats-' + props.numberOfDisks, val);
    
    if (unlimitedThresholds.includes(unlimitedWins)) {
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