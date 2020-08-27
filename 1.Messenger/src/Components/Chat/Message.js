import React, { forwardRef } from 'react';
import useStyles from './Styles';
import moment from 'moment';

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

const Message = forwardRef(({ username, message }, ref) => {
    const classes = useStyles();
    const isUser = username === message.username;
    return (
        <div ref={ref} className={`${classes.message} ${isUser && classes.message__user}`}>
            <Card className={isUser ? classes.message__userCard : classes.message__guestCard}>
                <CardContent className={classes.message__cardContent}>
                    <Typography 
                        variant="body2"
                        className={classes.message__username}>
                        {!isUser && `${message.username} says: `}
                    </Typography>
                    <Typography
                        variant="body1">
                        {message.message}
                    </Typography>
                </CardContent>
                <CardActions className={classes.message__cardActions}>
                    <Typography 
                        className={`${classes.message__time} ${isUser ? classes.message__time__user: classes.message__time__guess}`}>
                        {moment(message.timestamp?.toDate()).fromNow()}
                    </Typography>
                </CardActions>
            </Card>
        </div>
    )
})

export default Message;
