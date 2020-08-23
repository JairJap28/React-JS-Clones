import React from 'react';

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const Message = ({ username, text }) => {
    return (
        <Card>
            <CardContent>
                <Typography
                    variant="h5"
                    component="h2">
                    {text}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Message;
