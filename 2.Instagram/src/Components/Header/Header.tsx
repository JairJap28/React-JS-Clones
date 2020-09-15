import React, { useState, useEffect } from 'react';
import useStyles from './Styles';

// Router
import {
    SAVED,
    HOME
} from '../../Config/Route/Routes';

// Models
import IHeaderPost, {
    IHeaderStateToProps,
    IHeaderActionsToProps
} from './IHeaderProps';
import { User as FirebaseUser } from 'firebase';

// Redux
import { RootState } from '../../Redux/Store/index';
import { connect } from 'react-redux';
import {
    snackInfo,
    changeOpenHelper
} from '../../Redux/Actions/systemActions';
import {
    logOut
} from '../../Redux/Actions/firebaseActions';

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Icons
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withRouter } from 'react-router-dom';


const StyledMenu = withStyles((theme) => ({
    paper: {
        border: '1px solid #d3d4d5',
        width: 150,
        position: 'relative',
        overflow: 'visible !important',
        '&::before': {
            content: "''",
            width: 15,
            height: 15,
            background: 'white',
            position: 'absolute',
            top: -8,
            right: 53,
            borderTop: theme.custom.border.type1,
            borderLeft: theme.custom.border.type1,
            transform: 'rotate(45deg)',
        }
    },
}), { withTheme: true } )((props: MenuProps) => (
    <Menu
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        
    },
}))(MenuItem);


const Header: React.FC<IHeaderPost> = (props) => {
    const classes = useStyles();
    const [ user, setUser ] = useState<FirebaseUser | undefined>();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl) && Boolean(user);

    useEffect(() => {
        setUser(props.user);
        setAnchorEl(null);
    }, [props]);

    const handleOpenSignUp = () => {
        props.changeOpenHelper(true, 'SignUp');
    }

    const handleOpenSignIn = () => {
        props.changeOpenHelper(true, 'SignIn');
    }

    const handleSingOut = () => {
        props.logOut();
        props.snackInfo('You have been logged out successfully');
    }

    const handleCreatePost = () => {
        props.changeOpenHelper(true, 'CreatePost');
    }

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const goToSaved = () => {
        props.history.push(SAVED);
    }

    const goToHome = () => {
        props.history.push(HOME);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div
            className={classes.header__main}>
            <Box 
                display="flex"
                flexDirection="row"
                justifyContent="center"
                justifyItems="center"
                className={classes.header__container}>
                <Box flexGrow={1}>
                    <img
                        style={{
                            cursor: 'pointer'
                        }}
                        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                        alt="Instagram Logo"
                        onClick={goToHome}
                    />
                </Box>
                <Box >
                    {!Boolean(user) ? (
                        <div>
                            <Button onClick={handleOpenSignIn}>Sign In</Button>
                            <Button onClick={handleOpenSignUp}>Sign Up</Button>
                        </div>
                    ) : (
                            <Box display="flex" flexDirection="row">
                                <IconButton onClick={handleCreatePost}>
                                    <AddIcon />
                                </IconButton>
                                <div>
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenu}
                                        color="inherit">
                                        <AccountCircle />
                                    </IconButton>
                                    <StyledMenu
                                        id="simple-menu"
                                        open={open}
                                        onClose={handleClose}
                                        anchorEl={anchorEl}
                                        getContentAnchorEl={null}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}
                                        keepMounted>

                                        <StyledMenuItem onClick={goToSaved}>
                                            <ListItemIcon>
                                                <BookmarkBorderIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary="Saved" />
                                        </StyledMenuItem>
                                        <StyledMenuItem onClick={handleSingOut}>
                                            <ListItemIcon>
                                                <ExitToAppIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary="Log Out" />
                                        </StyledMenuItem>
                                    </StyledMenu>
                                </div>
                            </Box>
                        )}
                </Box>
            </Box>
        </div>
    )
};

const mapStateToProps = (state: RootState): IHeaderStateToProps => ({
    user: state.firebase.user,
});

const mapActionToProps: IHeaderActionsToProps = {
    logOut,
    snackInfo,
    changeOpenHelper
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(Header));