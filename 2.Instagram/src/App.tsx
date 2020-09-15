import React from 'react';
import './App.css';
import theme from './Config/Layout/Theme';

// Components
import Header from './Components/Header/Header';
import SnackBar from './Components/Layout/SnackBar/SnackBar';
import SignIn from './Components/Auth/SignIn/SignIn';
import SignUp from './Components/Auth/SignUp/SignUp';

// Router
import routes from './Components/Routes/Routes';
import { BrowserRouter as Router } from 'react-router-dom';

// MUI Stuff
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles(() => ({
  app__header: {
    position: 'sticky',
    width: '100%',
    top: 0,
    zIndex: 1
  },
}));

const App: React.FC<{}> = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackBar />
      <Router>
        <SignIn />
        <SignUp />
        <div className={classes.app__header}>
          <Header />
        </div>

        {routes}
      </Router>
    </ThemeProvider>
  );
}

export default App;