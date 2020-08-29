import React from 'react';
import './App.css';
import theme from './Config/Layout/Theme';

// Components
import Header from './Components/Header/Header';

// MUI Stuff
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'

const useStyles = makeStyles(() => ({
  app: {
      height: '100vh'
  }
}));

const App: React.FC<{}> = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={`App ${classes.app}`}>
        <Header />
        <h1>Hello World </h1>

        {/* Posts */}
      </div>
    </ThemeProvider>
  );
}

export default App;
