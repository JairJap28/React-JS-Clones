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

// Redux
import { RootState } from './Redux/Store/index';
import { connect } from 'react-redux';

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
  user?: FirebaseUser
}

const App: React.FC<AppProps> = (props) => {
  const classes = useStyles();
  const [posts, setPosts] = useState<Array<IPost>>([]);
  const [open, setOpen] = useState<boolean>(false);
  const { user } = props;

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

  const handleOpen = () => {
    setOpen(true);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <SignUp open={open}/>

      <div className={`App ${classes.app}`}>
        <Header />

        <Button onClick={handleOpen}>Sign Up</Button>

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

const mapStateToProps = (state: RootState): AppProps => ({
  user: state.system.user
});

export default connect(mapStateToProps, {})(App);