import React, { forwardRef } from 'react';
import useStyles from './Styles';
import moment from 'moment';

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

const Message = forwardRef(({ username, message }, ref) => {
    const isUser = username === message?.username;
    const classes = useStyles({ isUser });
    const [showHour, setShowHour] = React.useState(false);

    const changeHourVisibility = () => {
        setShowHour(!showHour);
    }

    return (
        <div ref={ref} className={`${classes.message} ${isUser && classes.message__user}`}>
            <Card 
                onClick={changeHourVisibility}
                className={isUser ? classes.message__userCard : classes.message__guestCard}>
                <CardContent className={classes.message__cardContent}>
                    {message ? (
                        <Typography
                            variant="body2"
                            className={classes.message__username}>
                            {!isUser && `${message.username} says: `}
                        </Typography>
                    ) :(
                        <Skeleton variant="text" />
                    )}
                    { message ? (
                        <Typography
                        variant="body1"
                        className={isUser ? classes.message__user__content: classes.message__guest__content}>
                        {message.message}
                    </Typography>
                    ): (
                        <Skeleton variant="text" />
                    )}
                    
                </CardContent>
                <CardActions 
                    style={{ display: showHour ? 'block': 'none' }}
                    className={classes.message__cardActions}>
                    <Typography 
                        className={`${classes.message__time} ${isUser ? classes.message__time__user: classes.message__time__guess}`}>
                        {moment(message?.timestamp?.toDate()).fromNow()}
                    </Typography>
                </CardActions>
            </Card>
        </div>
    )
})

export default Message;
