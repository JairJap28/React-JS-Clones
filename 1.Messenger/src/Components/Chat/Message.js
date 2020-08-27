import React, { forwardRef } from 'react';
import './Message.css';

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const Message = forwardRef(({ username, message }, ref) => {
    const isUser = username === message.username;
    return (
        <div ref={ref} className={`message ${isUser && 'message__user'}`}>
            <Card className={isUser ? 'message__userCard' : 'message__guestCard'}>
                <CardContent className="message__cardContent">
                    <Typography 
                        variant="body2"
                        className="message__username">
                        {!isUser && `${message.username} says: `}
                    </Typography>
                    <Typography
                        variant="body1"
                        component="h2">
                        {message.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
})

export default Message;
