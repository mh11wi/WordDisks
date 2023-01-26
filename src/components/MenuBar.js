import React, { createRef, useEffect, useState } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { FastForward, Help, Home, Lightbulb, MenuBook, Settings } from '@mui/icons-material';
import HelpDialog from './HelpDialog';
import SettingsDialog from './SettingsDialog';
import WordsDialog from './WordsDialog';
import TipsDialog from './TipsDialog';

const MenuBar = (props) => {
  const actionRef = createRef();
  const [helpOpen, setHelpOpen] = useState(true);
  const [tipsOpen, setTipsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [dictionaryOpen, setDictionaryOpen] = useState(false);
  const [columnWords, setColumnWords] = useState(null);
  
  useEffect(() => {
    if (props.hasWon) {
      actionRef.current.focusVisible();
    }
  }, [actionRef, props.hasWon]);
  
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
  
  const handleClickDictionary = async () => {
    setColumnWords(await props.getColumnWords());
    setDictionaryOpen(true);
  }
  
  const handleCloseDictionary = () => {
    setDictionaryOpen(false);
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
        />
        
        <IconButton action={actionRef} aria-label="New Game" onClick={props.handleClickNewGame} color="inherit">
          <FastForward />
        </IconButton>
        
        <IconButton aria-label="Home" href="https://mh11wi.github.io" color="inherit">
          <Home />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;