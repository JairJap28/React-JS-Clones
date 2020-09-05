import React, { useState, useEffect } from 'react';
import useStyles from './Styles';
import { IPostProps } from './IPostProps';

// Firebase
import firebase from 'firebase';
import { db } from '../../../Firebase/Firebase';

// Models
import IComment from '../../../Models/IComment';

// Components
import Comment from '../Comment/Comment';

// MUI Stuff
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

// Icons
import SendIcon from '@material-ui/icons/Send';

const Post: React.FC<IPostProps> = (props) => {
    const classes = useStyles();
    const [comments, setComments] = useState<Array<IComment>>([]);
    const [comment, setComment] = useState<string>('');

    useEffect(() => {
        let unsubscribe: any = null;
        if(props.postId) {
            unsubscribe = db
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
        }

        return () => {
            unsubscribe();
        }
    }, [props.postId]);
    
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

    return (
        <div className={classes.post}>
            <div className={classes.post__header}>
                <Avatar 
                    className={classes.post__avatar}
                    alt='JairJap28'
                />
                <h3>{props.username}</h3>
            </div>            

            <img 
                className={classes.post__image}
                src={props.imageUrl}
                alt="Post"/>

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
                                variant="outlined"
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
                                    )
                                }}
                            />
                        </Box>
                    </Box>
                </form>
            )}
        </div>
    )
}

export default Post;
