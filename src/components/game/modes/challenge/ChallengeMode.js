import { useContext, useEffect, useRef, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import GameInterface from 'components/game/GameInterface';
import { GameContext } from 'src/App';


const ChallengeMode = (props) => {
  const gameRef = useRef();
  const { disksText, setDisksText, setRotatedDisksText, timerStarted } = useContext(GameContext);
  const { seconds, minutes, hours, start, pause } = useStopwatch({ autoStart: false });
  const [wins, setWins] = useState(0);
  
  useEffect(() => {
    if (timerStarted) {
      start();
    }
  }, [timerStarted]);
  
  useEffect(() => {
    if (wins === 0) {
      gameRef.current.loadNewGame(props.lettersPerDisk, props.numberOfDisks);
    } else if (wins === props.targetWins) {
      pause();
    } else {
      setTimeout(function() {
        gameRef.current.loadNewGame(props.lettersPerDisk, props.numberOfDisks);
      }, 1500);
    }
  }, [wins, props.lettersPerDisk, props.numberOfDisks, props.targetWins]);
  
  const handleWin = () => {
    setWins(w => w + 1);
  }
  
  const Timer = () => {
    return (
      <span>{hours < 10 ? '0' + hours : hours}:{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</span>
    );
  }
  
  const Count = () => {
    return (
      <span>Wins: {wins}</span>
    );
  }
  
  return (
    <GameInterface
      ref={gameRef}
      handleWin={handleWin}
      left={<Timer />}
      right={<Count />}
    />
  );
};

export default ChallengeMode;