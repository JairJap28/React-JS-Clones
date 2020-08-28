import React, { useState, Fragment } from 'react';
import useStyles from './Styles';

// Redux
import { connect } from 'react-redux';
import { setUsername } from '../../Redux/Actions/UiActions';

// MUI Stuff
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

// Icons
import PersonPinIcon from '@material-ui/icons/PersonPin';

const Header = (props) => {
    const imgLogo = "https://en.facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=54&h=54";

    const [username, setUsername] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const classes = useStyles({ isUser: Boolean(username) });

    const handleChange = (event) => {
        setUsername(event.target.value);
        props.setUsername(event.target.value);
    }

    const handleOpenDialog = () => {
        setOpen(true);
    }

    const handleCloseDialog = () => {
        setOpen(false);
    }

    const handleCancelDialog = () => {
        setUsername('');
        handleCloseDialog();
    }

    return (
        <Fragment>
            <Dialog open={open} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Username</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This username will we used to map the messages with
                        the previous messages and it will the username to send 
                        a message.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Username"
                        type="text"
                        fullWidth
                        onChange={handleChange}
                        value={username}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCloseDialog} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.header__box}>
                <Box>
                    <img src={imgLogo} alt="Messenger logo" />
                </Box>
                <Box flexGrow={1}>
                    <h1>Hello {Boolean(username) ? username : 'unknown'}</h1>
                </Box>
                <Box className={classes.header__input__username}>
                    <IconButton 
                        onClick={handleOpenDialog}
                        className={classes.header__iconButton}>
                        <PersonPinIcon fontSize="large" />
                    </IconButton>
                </Box>
            </Box>
        </Fragment>
        
    )
};

const mapActionsToProps = {
    setUsername
}

export default connect(null, mapActionsToProps)(Header);
