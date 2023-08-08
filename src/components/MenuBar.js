import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Help, Home, Lightbulb, MenuBook, Settings, Share } from '@mui/icons-material';
import HelpDialog from './HelpDialog';
import SettingsDialog from './SettingsDialog';
import WordsDialog from './WordsDialog';
import TipsDialog from './TipsDialog';
import ShareDialog from './ShareDialog';

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

const MenuBar = (props) => {
  const [helpOpen, setHelpOpen] = useState(true);
  const [tipsOpen, setTipsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [dictionaryOpen, setDictionaryOpen] = useState(false);
  const [columnWords, setColumnWords] = useState(null);
  const [shareOpen, setShareOpen] = useState(false);
  
  const shareData = {
    title: "Word Disks",
    text: props.getQueryString() ? "Can you solve this puzzle?" : "Like word games? Try:",
    url: "https://mh11wi.github.io/WordDisks" + props.getQueryString()
  };
  
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
  
  return (
    <AppBar position="relative">
      <Toolbar variant="dense">
        <IconButton aria-label="Help" onClick={handleClickHelp} color="inherit">
          <Help />
        </IconButton>
        <HelpDialog
          open={helpOpen}
          onClose={handleCloseHelp}
          useSwipeMode={props.useSwipeMode}
        />
        
        <IconButton aria-label="Tips" onClick={handleClickTips} color="inherit">
          <Lightbulb />
        </IconButton>
        <TipsDialog
          open={tipsOpen}
          onClose={handleCloseTips}
        />
        
        <IconButton aria-label="Dictionary" onClick={handleClickDictionary} color="inherit">
          <MenuBook />
        </IconButton>
        <WordsDialog
          open={dictionaryOpen}
          onClose={handleCloseDictionary}
          data={columnWords}
          updateDefinitions={props.updateDefinitions}
        />
        
        <Typography variant="h5" component="h1" align="center" sx={{ fontWeight: 500, flexGrow: 1 }}>
          Word Disks
        </Typography>
        
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
        
        <IconButton aria-label="Share" onClick={handleClickShare} color="inherit">
          <Share />
        </IconButton>
        <ShareDialog
          open={shareOpen}
          onClose={handleCloseShare}
          data={shareData}
        />
        
        <IconButton aria-label="Home" href="https://mh11wi.github.io" color="inherit">
          <Home />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;