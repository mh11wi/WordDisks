import React from 'react';
import { Box, Drawer, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Facebook, Help, Home, Leaderboard, Lightbulb, MenuBook, Settings, Share, Twitter, YouTube } from '@mui/icons-material';

const MainMenu = (props) => {
  const handleClickHelp = () => {
    props.onClose();
    props.handleClickHelp();
  }
  
  const handleClickTips = () => {
    props.onClose();
    props.handleClickTips();
  }

  const handleClickSettings = () => {
    props.onClose();
    props.handleClickSettings();
  }
  
  const handleClickDictionary = () => {
    props.onClose();
    props.handleClickDictionary();
  }
  
  const handleClickShare = async () => {
    props.onClose();
    await props.handleClickShare();
  }
  
  const handleClickStatistics = () => {
    props.onClose();
    props.handleClickStatistics();
  }
  
  return (
    <Drawer
      PaperProps={{ 
        sx: { 
          width: {
            xs: '50%',
            sm: '33%',
            lg: '20%'
          }
        }
      }}
      open={props.open} 
      onClose={props.onClose} 
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
        <List>
          <ListItemButton onClick={handleClickHelp}>
            <ListItemIcon>
              <Help />
            </ListItemIcon>
            <ListItemText>How To Play</ListItemText>
          </ListItemButton>
          
          <ListItemButton onClick={handleClickTips}>
            <ListItemIcon>
              <Lightbulb />
            </ListItemIcon>
            <ListItemText>Tips & Tidbits</ListItemText>
          </ListItemButton>
          
          <ListItemButton onClick={handleClickStatistics}>
            <ListItemIcon>
              <Leaderboard />
            </ListItemIcon>
            <ListItemText>Stats & Achievements</ListItemText>
          </ListItemButton>
          
          <ListItemButton onClick={handleClickDictionary}>
            <ListItemIcon>
              <MenuBook />
            </ListItemIcon>
            <ListItemText>Dictionary</ListItemText>
          </ListItemButton>
          
          <ListItemButton onClick={handleClickSettings}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </ListItemButton>
          
          <ListItemButton onClick={handleClickShare}>
            <ListItemIcon>
              <Share />
            </ListItemIcon>
            <ListItemText>Share Game</ListItemText>
          </ListItemButton>
          
          <Link href="https://mh11wi.github.io" sx={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton onClose={props.onClose}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText>Home</ListItemText>
            </ListItemButton>
          </Link>
        </List>
        
        <List sx={{ borderTop: '1px solid #dbdbdb' }}>
          <ListItem sx={{ py: 0 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <YouTube />
            </ListItemIcon>
            <ListItemText>
              <Link 
                href="https://youtube.com/@worddisks" 
                target="_blank" 
                sx={{ fontSize: '0.9em'}}
              >
                youtube.com/@worddisks
              </Link>
            </ListItemText>
          </ListItem>
          
          <ListItem sx={{ py: 0 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Facebook />
            </ListItemIcon>
            <ListItemText>
              <Link 
                href="https://facebook.com/worddisks" 
                target="_blank"
                sx={{ fontSize: '0.9em'}}
              >
                facebook.com/worddisks
              </Link>
            </ListItemText>
          </ListItem>
          
          <ListItem sx={{ py: 0 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Twitter />
            </ListItemIcon>
            <ListItemText>
              <Link 
                href="https://twitter.com/worddisks" 
                target="_blank"
                sx={{ fontSize: '0.9em'}}
              >
                twitter.com/worddisks
              </Link>
            </ListItemText>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default MainMenu;