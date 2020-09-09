import React, { useState, useEffect, Fragment } from 'react';
import useStyles from './Styles';

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
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// Icons
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';

const Header: React.FC<IHeaderPost> = (props) => {
    const classes = useStyles();
    const [ user, setUser ] = useState<FirebaseUser | undefined>();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [open, setOpen] = React.useState<boolean>(false);

    useEffect(() => {
        setUser(props.user);
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
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                        className={classes.header__img__logo}
                        alt="Instagram Logo"
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
                                    <Menu
                                        open={open}
                                        onClose={handleClose}
                                        PaperProps={{
                                            className: classes.header__menu
                                        }}
                                        MenuListProps={{
                                            className: classes.header__menu__items
                                        }}>

                                        <MenuItem
                                            onClick={handleClose}>
                                            Saved
                                        </MenuItem>
                                        <MenuItem onClick={handleSingOut}>
                                            Log Out
                                        </MenuItem>
                                    </Menu>
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

export default connect(mapStateToProps, mapActionToProps)(Header);