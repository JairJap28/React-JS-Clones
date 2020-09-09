import React from 'react';
import './App.css';
import theme from './Config/Layout/Theme';

// Pages
import Home from './Pages/Home/Home';

// MUI Stuff
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const App: React.FC<{}> = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  );
}

export default App;