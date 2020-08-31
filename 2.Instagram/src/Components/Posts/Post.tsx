import React from 'react';
import useStyles from './Styles';
import { IPostProps } from './IPostProps';

// MUI Stuff
import Avatar from '@material-ui/core/Avatar';

const Post: React.FC<IPostProps> = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.post}>
            <div className={classes.post__header}>
                <Avatar 
                    className={classes.post__avatar}
                    alt='JairJap28'
                />
                <h3>Username</h3>
            </div>            

            <img 
                className={classes.post__image}
                src={props.imageUrl}
                alt="Post"/>

            <h4 className={classes.post__text}>
                <strong>{props.username}</strong> {props.caption}
            </h4>
        </div>
    )
}

export default Post;
