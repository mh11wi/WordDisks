import { createTheme, ThemeProvider } from '@mui/material/styles';
import teal from '@mui/material/colors/teal';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ReactDisks from 'react-disks';
import './App.css';

function App() {
  const disksText = [
    ['a', 'b', 'c', 'd'], 
    ['e', 'f', 'g', 'h'], 
    ['i', 'j', 'k', 'l'], 
    ['m', 'n', 'o', 'p'], 
    ['q', 'r', 's', 't'], 
    ['u', 'v', 'w', 'x'], 
    ['y', 'z', '1', '2']
  ];
  
  const theme = createTheme({
    palette: {
      primary: {
        main: teal[500],
        light: teal[100],
        dark: teal[800]
      }
    },
  });
  
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="relative">
            <Toolbar>
              <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
                Word Disks
              </Typography>
              <Button href="https://mh11wi.github.io" color="inherit">Home</Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Box role="main" sx={{ flexGrow: 1, height: "calc(100% - 64px)"}}>
          <ReactDisks 
            disksText={disksText}
            theme={theme.palette.primary}
          />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
