import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Help, Menu, MenuBook, Settings } from '@mui/icons-material';
import MainMenu from './MainMenu';
import HelpDialog from './HelpDialog';
import SettingsDialog from './SettingsDialog';
import WordsDialog from './WordsDialog';
import TipsDialog from './TipsDialog';
import ShareDialog from './ShareDialog';
import StatisticsDialog from './StatisticsDialog';

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

const MenuBar = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(true);
  const [tipsOpen, setTipsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [dictionaryOpen, setDictionaryOpen] = useState(false);
  const [columnWords, setColumnWords] = useState(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [statisticsOpen, setStatisticsOpen] = useState(false);
  
  const shareData = {
    title: "Word Disks",
    text: props.getQueryString() ? "Can you solve this puzzle?" : "Like word games? Try:",
    url: "https://mh11wi.github.io/WordDisks" + props.getQueryString()
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
    setColumnWords(props.getColumnWords());
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
          useSwipeMode={props.useSwipeMode}
        />
        
        <Typography variant="h5" component="h1" align="center" sx={{ fontWeight: 500, flexGrow: 1 }}>
          Word Disks
        </Typography>
        
        <IconButton aria-label="Dictionary" onClick={handleClickDictionary} color="inherit">
          <MenuBook />
        </IconButton>
        <WordsDialog
          open={dictionaryOpen}
          onClose={handleCloseDictionary}
          data={columnWords}
          updateDefinitions={props.updateDefinitions}
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
          useUppercase={props.useUppercase}
          setUseUppercase={props.setUseUppercase}
          useSwipeMode={props.useSwipeMode}
          setUseSwipeMode={props.setUseSwipeMode}
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