import React from 'react';
import './App.css';
import theme from './Config/Layout/Theme';

// Components
import Header from './Components/Header/Header';
import SnackBar from './Components/Layout/SnackBar/SnackBar';
import SignIn from './Components/Auth/SignIn/SignIn';
import SignUp from './Components/Auth/SignUp/SignUp';

// Pages
import Home from './Pages/Home/Home';
import Saved from './Pages/Saved/Saved';

// Router
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import {
  HOME,
  SAVED,
  LANDING
} from './Config/Route/Routes';

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
      <SignIn />
      <SignUp />
      <div className={classes.app__header}>
        <Header />
      </div>
      <Router>
        <Switch>
          <Route path={HOME} ><Home /></Route>
          <Route path={SAVED} ><Saved /></Route>
          <Route path={LANDING}><Home /></Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;