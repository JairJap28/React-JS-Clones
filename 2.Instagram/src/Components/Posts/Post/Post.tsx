import React, { useState, useEffect } from 'react';
import useStyles from './Styles';
import moment from 'moment';

// Firebase
import firebase from 'firebase';
import { db } from '../../../Firebase/Firebase';

// Redux
import { connect } from 'react-redux';
import { snackInfo } from '../../../Redux/Actions/systemActions';

// Models
import IPostProps, {
    IPostActionToProps
} from './IPostProps';
import IComment from '../../../Models/IComment';
import ILike from '../../../Models/ILike';

// Components
import Comment from '../Comment/Comment';

// MUI Stuff
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

// Icons
import SendIcon from '@material-ui/icons/Send';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';


const Post: React.FC<IPostProps> = (props) => {
    const classes = useStyles();
    const [comments, setComments] = useState<Array<IComment>>([]);
    const [likes, setLikes] = useState<Array<ILike>>([]);
    const [comment, setComment] = useState<string>('');
    const [likedByUser, setLikeByUSer] = useState<string | undefined>('');
    const [savedByUser, setSavedByUser] = useState<string | undefined>('');

    useEffect(() => {
        let unsubscribeComments: any = null;
        let unsubscribeLikes: any = null;
        let unsubscribeSave: any = null;
        if(props.postId) {
            unsubscribeComments = db
            .collection('posts')
            .doc(props.postId)
            .collection('comments')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => {
                setComments(snapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        text: doc.data().text,
                        username: doc.data().username
                    };
                }));
            });

            unsubscribeLikes = db
            .collection('posts')
            .doc(props.postId)
            .collection('likes')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => {
                setLikes(snapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        username: doc.data().username,
                        timestamp: doc.data().timestamp
                    };
                }));
            });

            unsubscribeSave = db
            .collection('posts')
            .doc(props.postId)
            .collection('saved')
            .where('username', '==', props.loggedUser)
            .onSnapshot(snapshot => {
                let auxSaved = snapshot.docs.map(doc => {
                    return doc.id;
                });
                setSavedByUser(auxSaved[0]);
            });
        }

        return () => {
            unsubscribeComments();
            unsubscribeLikes();
            unsubscribeSave();
        }
    }, [props.loggedUser, props.postId]);

    useEffect(() => {
        setLikeByUSer(likes.find(item => item.username === props.loggedUser)?.id);
    }, [likes, props.loggedUser]);
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    }

    const postComment = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        db
        .collection('posts')
        .doc(props.postId)
        .collection('comments')
        .add({
            text: comment,
            username: props.loggedUser,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }

    const controlLikeChange = () => {
        if(props.loggedUser){
            if(likedByUser) {
                db
                .collection('posts')
                .doc(props.postId)
                .collection('likes')
                .doc(likedByUser).delete();
            } else {
                db
                .collection('posts')
                .doc(props.postId)
                .collection('likes')
                .add({
                    username: props.loggedUser,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
            }
        } else {
            props.snackInfo('You have to log in to like any post');
        }
    }

    const controlSaveChange = () => {
        if(props.loggedUser){
            if(savedByUser) {
                db
                .collection('posts')
                .doc(props.postId)
                .collection('saved')
                .doc(savedByUser).delete();
            } else {
                db
                .collection('posts')
                .doc(props.postId)
                .collection('saved')
                .add({
                    username: props.loggedUser,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
            }
        } else {
            props.snackInfo('You have to log in to save any post');
        }
    }

    return (
        <div className={classes.post}>
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.post__header}>
                <Box flexGrow={1} className={classes.post__header__user}>
                    <Avatar
                        className={classes.post__avatar}
                        alt='JairJap28'
                    />
                    <h3>{props.username}</h3>
                </Box>
                <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                        { moment(props.time?.toDate()).fromNow() }
                    </Typography>
                </Box>
            </Box>           

            <img 
                className={classes.post__image}
                src={props.imageUrl}
                alt="Post"/>

            <Box display="flex" flexDirection="row">
                <Box display="flex" flexDirection="row" flexGrow={1}>
                    <Box>
                        <IconButton onClick={controlLikeChange}>
                            { likedByUser ? (
                                <FavoriteIcon className={classes.post__likes__liked}/>
                            ): (
                                <FavoriteBorderIcon />
                            ) }
                        </IconButton>
                    </Box>
                    <Box>
                        <IconButton>
                            <ChatBubbleOutlineIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Box>
                    <IconButton onClick={controlSaveChange}>
                        { savedByUser ? (
                            <BookmarkIcon />
                        ): (
                            <BookmarkBorderIcon />
                        ) }
                    </IconButton>
                </Box>
            </Box>
            <div className={classes.post__likes}>
                <strong>{likes.length} {likes.length === 1 ? 'like':  'likes'}</strong>
            </div>
            
            <h4 className={classes.post__text}>
                <strong>{props.username}</strong> {props.caption}
            </h4>

            <div className={classes.post__comments}>
                { comments.map((com: IComment) => (
                    <Comment key={com.id} id={com.id} text={com.text} username={com.username} />
                ))}
            </div>

            {props.loggedUser && (
                <form className={classes.post__form__comment}>
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <Box flexGrow={1}>
                            <TextField
                                variant="standard"
                                fullWidth
                                className={classes.post__input}
                                type="text"
                                placeholder="Add a new comment"
                                value={comment}
                                onChange={handleChange}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            onClick={postComment}
                                            disabled={!Boolean(comment)}>
                                            <SendIcon />
                                        </IconButton>
                                    ),
                                    disableUnderline: true
                                }}
                            />
                        </Box>
                    </Box>
                </form>
            )}
        </div>
    )
}

const mapActionsToProps: IPostActionToProps = {
    snackInfo
}

export default connect(null, mapActionsToProps)(Post);
