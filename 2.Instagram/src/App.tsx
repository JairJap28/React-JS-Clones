import React, { useState, useEffect } from 'react';
import './App.css';
import theme from './Config/Layout/Theme';

// Models
import { IPost } from './Models/IPost';
import { User as FirebaseUser } from 'firebase';

// Firebase
import { db } from './Firebase/Firebase';

// Components
import Header from './Components/Header/Header';
import Post from './Components/Posts/Post';
import SignUp from './Components/Auth/SignUp';
import SnackBar from './Components/Layout/SnackBar/SnackBar';

// Redux
import { RootState } from './Redux/Store/index';
import { connect } from 'react-redux';
import { 
  logOut,
  changeOpenHelper
} from './Redux/Actions/systemActions';
import { SystemActionTypes } from './Redux/Types';

// MUI Stuff
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  app: {
      height: '100vh'
  },
  app__posts: {
    marginTop: 45
  },
}));

type AppProps = {
  user?: FirebaseUser,
  open: boolean,
  logOut: () => SystemActionTypes | undefined,
  changeOpenHelper: (state: boolean) => SystemActionTypes | undefined
}

const App: React.FC<AppProps> = (props) => {
  const classes = useStyles();
  const [posts, setPosts] = useState<Array<IPost>>([]);
  const [ user, setUser ] = useState<FirebaseUser | undefined>();

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => {
        return {
          id: doc.id,
          caption: doc.data().caption,
          imageUrl: doc.data().imageUrl,
          username: doc.data().username
        };
      }));
    })
  }, []);

  useEffect(() => {
    setUser(props.user);
  }, [props]);

  const handleOpen = () => {
    props.changeOpenHelper(true);
  }

  const handleSingOut = () => {
    props.logOut();
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackBar />
      <SignUp />

      <div className={`App ${classes.app}`}>
        <Header />

        { !Boolean(user) ? (
          <Button onClick={handleOpen}>Sign Up</Button> 
        ): (
          <Button onClick={handleSingOut}>Log Out</Button> 
        )}

        <div className={classes.app__posts}>
          { posts && posts.map((post: IPost) => (
            <Post
              key={post.id}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          )) }
        </div>
      </div>
    </ThemeProvider>
  );
}

const mapStateToProps = (state: RootState) => ({
  user: state.system.user,
  open: state.system.open || false
});

const mapActionsToProps = {
  logOut,
  changeOpenHelper
}

export default connect(mapStateToProps, mapActionsToProps)(App);