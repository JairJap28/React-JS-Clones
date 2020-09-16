import React, { useState, useEffect } from 'react';
import theme from '../../Config/Layout/Theme';
import InstagramEmbed from 'react-instagram-embed';
import useStyles from './Styles';

// Models
import { IPost } from '../../Models/IPost';
import HomeProps, {
    IHomeStateToProps,
    IHomeActionsToProps
} from './HomeProps';

// Firebase
import { db } from '../../Firebase/Firebase';

// Components
import Post from '../../Components/Posts/Post/Post';
import CreatePost from '../../Components/Posts/CreatePost/CreatePost';

// Redux
import { RootState } from '../../Redux/Store/index';
import { connect } from 'react-redux';
import {
    changeOpenHelper
} from '../../Redux/Actions/systemActions';
import {
    logOut
} from '../../Redux/Actions/firebaseActions';

// MUI Stuff
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const Home: React.FC<HomeProps> = (props) => {
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
                        username: doc.data().username,
                        timestamp: doc.data().timestamp,
                        likes: doc.data().likes || 0,
                        comments: doc.data().likes || 0
                    };
                }));
            })
    }, []);



    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <CreatePost />

            <div>

                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh">
                    <div className={classes.home__posts}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={8}>
                                {posts && posts.map((post: IPost) => (
                                    <Post
                                        key={post.id}
                                        id={post.id}
                                        username={post.username}
                                        caption={post.caption}
                                        imageUrl={post.imageUrl}
                                        timestamp={post.timestamp}
                                        likes={post.likes}
                                        comments={post.comments}
                                        loggedUser={props.user?.displayName || ''}
                                        userUid={props.user?.uid || ''}
                                    />
                                ))}
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <InstagramEmbed
                                    className={classes.home__embed}
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

const mapStateToProps = (state: RootState): IHomeStateToProps => ({
    user: state.firebase.user,
    open: state.system.open?.open || false
});

const mapActionsToProps: IHomeActionsToProps = {
    logOut,
    changeOpenHelper
}

export default connect(mapStateToProps, mapActionsToProps)(Home);