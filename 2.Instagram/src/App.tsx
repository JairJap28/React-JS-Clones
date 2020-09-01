import React, { useState, useEffect } from 'react';
import './App.css';
import theme from './Config/Layout/Theme';

// Models
import { IPost } from './Models/IPost';
import { IUserLogin } from './Models/IUserLogin';

// Firebase
import { db } from './Firebase/Firebase';

// Components
import Header from './Components/Header/Header';
import Post from './Components/Posts/Post';

// MUI Stuff
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles(() => ({
  app: {
      height: '100vh'
  },
  app__posts: {
    marginTop: 45
  },
  app__paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const App: React.FC<{}> = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState<Array<IPost>>([]);
  const [open, setOpen] = useState<boolean>(true);
  const [modalStyle] = React.useState(getModalStyle);
  const [user, setUser] = React.useState<IUserLogin>({ email: '', password: '' });

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

  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [event.target.name]: event.target.value});
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Modal
        open={open}
        onClose={handleClose}>
        <div style={modalStyle} className={classes.app__paper}>
          <Box 
            display="flex" 
            flexDirection="column"
            justifyContent="center">
            <Box>
              <img
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Instagram Logo"
              />
            </Box>
            <Box>
              <Box>
                <Input 
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <Input 
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </Box>
            </Box>
          </Box>
        </div>
      </Modal>

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