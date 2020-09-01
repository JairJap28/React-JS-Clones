import React, { useState, useEffect } from 'react';
import './App.css';
import theme from './Config/Layout/Theme';

// Models
import { IPost } from './Models/IPost';

// Firebase
import { db } from './Firebase/Firebase';

// Components
import Header from './Components/Header/Header';
import Post from './Components/Posts/Post';
import SignUp from './Components/Auth/SignUp';

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

const App: React.FC<{}> = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState<Array<IPost>>([]);
  const [open, setOpen] = useState<boolean>(true);

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

export default App;