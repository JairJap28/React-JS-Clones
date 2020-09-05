import React, { useState, useEffect } from 'react';
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
    logOut,
    snackInfo,
    changeOpenHelper
} from '../../Redux/Actions/systemActions';

// MUI Stuff
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const Header: React.FC<IHeaderPost> = (props) => {
    const classes = useStyles();
    const [ user, setUser ] = useState<FirebaseUser | undefined>();

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

    return (
        <Box 
            display="flex"
            flexDirection="row"
            alignItems="center"
            className={classes.header__main}>
            <Box flexGrow={1}>
                <img 
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    className={classes.header__img__logo}
                    alt="Instagram Logo"
                />
            </Box>
            <Box>
                {!Boolean(user) ? (
                    <div>
                        <Button onClick={handleOpenSignIn}>Sign In</Button>
                        <Button onClick={handleOpenSignUp}>Sign Up</Button>
                    </div>
                ) : (
                    <div>
                        <Button onClick={handleSingOut}>Log Out</Button>
                        <Button onClick={handleCreatePost}>Create</Button>
                    </div>
                )}
            </Box>
        </Box>
    )
};

const mapStateToProps = (state: RootState): IHeaderStateToProps => ({
    user: state.system.user,
});

const mapActionToProps: IHeaderActionsToProps = {
    logOut,
    snackInfo,
    changeOpenHelper
};

export default connect(mapStateToProps, mapActionToProps)(Header);