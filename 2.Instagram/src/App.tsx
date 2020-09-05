import React, { useState, useEffect } from 'react';
import './App.css';
import theme from './Config/Layout/Theme';
import InstagramEmbed from 'react-instagram-embed';

// Models
import { IPost } from './Models/IPost';
import { User as FirebaseUser } from 'firebase';

// Firebase
import { db } from './Firebase/Firebase';

// Components
import Header from './Components/Header/Header';
import Post from './Components/Posts/Post/Post';
import SignUp from './Components/Auth/SignUp/SignUp';
import SignIn from './Components/Auth/SignIn/SignIn';
import SnackBar from './Components/Layout/SnackBar/SnackBar';
import CreatePost from './Components/Posts/CreatePost/CreatePost';

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
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(() => ({
  app: {
      
  },
  app__header: {
    position: 'sticky',
    width: '100%',
    top: 0,
    zIndex: 1
  },
  app__posts: {
    padding: 10
  },
}));

type AppProps = {
  user?: FirebaseUser,
  open: boolean,
  logOut: () => SystemActionTypes | undefined,
  changeOpenHelper: (state: boolean, component: string) => SystemActionTypes | undefined
}

const App: React.FC<AppProps> = (props) => {
  const classes = useStyles();
  const [posts, setPosts] = useState<Array<IPost>>([]);

  useEffect(() => {
    db.collection('posts')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
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

  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackBar />
      <SignIn />
      <SignUp />
      <CreatePost />

      <div className={`App ${classes.app}`}>
        <div className={classes.app__header}>
          <Header />
        </div>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh">
          <div className={classes.app__posts}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                {posts && posts.map((post: IPost) => (
                  <Post
                    key={post.id}
                    postId={post.id}
                    username={post.username}
                    caption={post.caption}
                    imageUrl={post.imageUrl}
                    loggedUser={props.user?.displayName || ''}
                  />
                ))}
              </Grid>
              <Grid item xs={12} sm={4}>
                <InstagramEmbed
                  url='https://www.instagram.com/p/BsPEvaDAxiR/?utm_source=ig_web_copy_link'
                  hideCaption={false}
                  containerTagName='div'
                  protocol=''
                  onLoading={() => { }}
                  onSuccess={() => { }}
                  onAfterRender={() => { }}
                  onFailure={() => { }}
                />
              </Grid>
            </Grid>
          </div>
        </Box>

        
      </div>
    </ThemeProvider>
  );
}

const mapStateToProps = (state: RootState) => ({
  user: state.system.user,
  open: state.system.open?.open || false
});

const mapActionsToProps = {
  logOut,
  changeOpenHelper
}

export default connect(mapStateToProps, mapActionsToProps)(App);