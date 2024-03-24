import { useContext, useRef, useState } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Help, Menu, MenuBook, Settings } from '@mui/icons-material';
import MainMenu from 'components/menu/MainMenu';
import HelpDialog from 'components/menu/dialogs/help/HelpDialog';
import SettingsDialog from 'components/menu/dialogs/settings/SettingsDialog';
import DictionaryDialog from 'components/menu/dialogs/dictionary/DictionaryDialog';
import TipsDialog from 'components/menu/dialogs/tips/TipsDialog';
import ShareDialog from 'components/menu/dialogs/share/ShareDialog';
import StatisticsDialog from 'components/menu/dialogs/statistics/StatisticsDialog';
import { isMobile } from 'helpers/app';
import { GameContext } from 'src/App';


const MenuBar = (props) => {
  const dictionaryRef = useRef();
  const { gameMode, disksText } = useContext(GameContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(true);
  const [tipsOpen, setTipsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [dictionaryOpen, setDictionaryOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [statisticsOpen, setStatisticsOpen] = useState(false);
  
  let text, query;
  switch (gameMode) {
    case 'unlimited':
      if (disksText) {
        const disks = disksText.map((disk) => disk.join('')).join('_');
        text = "Can you solve this puzzle?";
        query = `?disks=${disks}`;
        break;
      }
    default:
      text = "Like word games? Try:";
      query = "";
      break;
  }
    
  const shareData = {
    title: "Word Disks",
    text: text,
    url: "https://mh11wi.github.io/WordDisks" + query
  };
  
  const handleClickMenu = () => {
    setMenuOpen(true);
  }
  
  const handleCloseMenu = () => {
    setMenuOpen(false);
  }
  
  const handleClickHelp = () => {
    setHelpOpen(true);
  }
  
  const handleCloseHelp = () => {
    setHelpOpen(false);
  }
  
  const handleClickTips = () => {
    setTipsOpen(true);
  }
  
  const handleCloseTips = () => {
    setTipsOpen(false);
  }
  
  const handleClickSettings = () => {
    setSettingsOpen(true);
  }
  
  const handleCloseSettings = () => {
    setSettingsOpen(false);
  }
  
  const handleClickDictionary = () => {
    dictionaryRef.current.updateData();
    setDictionaryOpen(true);
  }
  
  const handleCloseDictionary = () => {
    setDictionaryOpen(false);
  }
  
  const handleClickShare = async () => {
    if (!isMobile()) {
      setShareOpen(true);
    } else {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== "AbortError") {
          setShareOpen(true);
        }
      }
    }
  }
  
  const handleCloseShare = () => {
    setShareOpen(false);
  }
  
  const handleClickStatistics = () => {
    setStatisticsOpen(true);
  }
  
  const handleCloseStatistics = () => {
    setStatisticsOpen(false);
  }
  
  return (
    <AppBar position="relative">
      <Toolbar variant="dense">
        <IconButton aria-label="Menu" onClick={handleClickMenu} color="inherit">
          <Menu />
        </IconButton>
        <MainMenu
          open={menuOpen}
          onClose={handleCloseMenu}
          handleClickHelp={handleClickHelp}
          handleClickTips={handleClickTips}
          handleClickDictionary={handleClickDictionary}
          handleClickShare={handleClickShare}
          handleClickSettings={handleClickSettings}
          handleClickStatistics={handleClickStatistics}
        />
      
        <IconButton aria-label="Help" onClick={handleClickHelp} color="inherit">
          <Help />
        </IconButton>
        <HelpDialog
          open={helpOpen}
          onClose={handleCloseHelp}
        />
        
        <Typography variant="h5" component="h1" align="center" sx={{ fontWeight: 500, flexGrow: 1 }}>
          Word Disks
        </Typography>
        
        <IconButton aria-label="Dictionary" onClick={handleClickDictionary} color="inherit">
          <MenuBook />
        </IconButton>
        <DictionaryDialog
          ref={dictionaryRef}
          open={dictionaryOpen}
          onClose={handleCloseDictionary}
        />
        
        <IconButton aria-label="Settings" onClick={handleClickSettings} color="inherit">
          <Settings />
        </IconButton>
        <SettingsDialog
          open={settingsOpen}
          onClose={handleCloseSettings}
          numberOfDisks={props.numberOfDisks}
          setNumberOfDisks={props.setNumberOfDisks}
          lettersPerDisk={props.lettersPerDisk}
          setLettersPerDisk={props.setLettersPerDisk}
        />
        
        {/* Dialogs where icon only in MainMenu: */}
        <TipsDialog
          open={tipsOpen}
          onClose={handleCloseTips}
        />
        
        <ShareDialog
          open={shareOpen}
          onClose={handleCloseShare}
          data={shareData}
        />
        
        <StatisticsDialog
          open={statisticsOpen}
          onClose={handleCloseStatistics}
          unlimitedStats={props.unlimitedStats}
        />
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;