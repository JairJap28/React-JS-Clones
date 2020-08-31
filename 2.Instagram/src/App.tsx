import React, { useState } from 'react';
import './App.css';
import theme from './Config/Layout/Theme';

// Models
import { IPost } from './Models/IPost';

// Components
import Header from './Components/Header/Header';
import Post from './Components/Posts/Post';

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
  const [posts, setPosts] = useState<Array<IPost>>([
    {
      username:"Jair", 
      imageUrl:"https://miro.medium.com/max/1200/1*1Z177dpTeAp7uEFc5Zx2xg.png",
      caption:"WOW it works"
    },
    {
      username:"Jap",
      imageUrl:"https://hackernoon.com/hn-images/1*VeM-5lsAtrrJ4jXH96h5kg.png",
      caption:"Testing"
    }
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={`App ${classes.app}`}>
        <Header />
        { posts.map((post: IPost, index: number) => (
          <Post 
            key={index}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        )) }
      </div>
    </ThemeProvider>
  );
}

export default App;
