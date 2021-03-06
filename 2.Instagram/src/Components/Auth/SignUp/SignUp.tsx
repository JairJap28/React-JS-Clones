import React, { useState, useEffect } from 'react';
import useStyles from './Styles';

// Models
import { IUserLogin } from '../../../Models/IUserLogin';
import ISignUpProps, {
    ISignUpStateToProps,
    ISignUpActionsToProps
} from './ISignUpProps';

// Firebase
import { auth } from '../../../Firebase/Firebase';
import { User as FirebaseUser } from 'firebase';

// Redux
import { connect } from 'react-redux';
import {
    snackError,
    snackSuccess,
    changeOpenHelper
} from '../../../Redux/Actions/systemActions';
import {
    logInSuccess
} from '../../../Redux/Actions/firebaseActions';
import { RootState } from '../../../Redux/Store/index';

// MUI Stuff
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const SignUp: React.FC<ISignUpProps> = (props) => {
    const displayName = 'SignUp';
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(false);
    const [modalStyle] = React.useState(getModalStyle);
    const [user, setUser] = React.useState<IUserLogin>({ email: '', password: '', username: '' });
    const [firebaseUser, setFirebaseUser] = React.useState<FirebaseUser | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser: FirebaseUser | null ) => {
            if(authUser) {
                // User has log in
                setFirebaseUser(authUser);
                props.logInSuccess(authUser);
            } else {
                // User has log out
            }
        });
        return () => {
            // Perform some cleanup actions
            unsubscribe();
        }
    }, [firebaseUser, user.username]);

    useEffect(() => {
        setOpen(props.open.component === displayName && props.open.open);
    }, [props]);

    const handleClose = () => {
        setOpen(false);
        props.changeOpenHelper(false, '');
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    const handleSignUp = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();

        auth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((authUser: firebase.auth.UserCredential) => {
            props.changeOpenHelper(false, '');
            props.snackSuccess('You have been register successfully');
            setUser({ username: '', password: '', email: ''});
            return authUser.user?.updateProfile({
                displayName: user.username
            });
        })
        .catch((error: any) => props.snackError(error.message));
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}>
            <div style={modalStyle} className={classes.signUp__paper}>
                <form>
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center">
                        <Box>
                            <img
                                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                                alt="Instagram Logo"
                            />
                        </Box>
                        <Box>
                            <Box m={1}>
                                <FormControl fullWidth className={classes.signUp__formControl}>
                                    <InputLabel>Username</InputLabel>
                                    <Input
                                        type="text"
                                        name="username"
                                        value={user.username}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </Box>
                            <Box m={1}>
                                <FormControl fullWidth className={classes.signUp__formControl}>
                                    <InputLabel>Email</InputLabel>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </Box>
                            <Box m={1}>
                                <FormControl fullWidth className={classes.signUp__formControl}>
                                    <InputLabel>Password</InputLabel>
                                    <Input
                                        type="password"
                                        name="password"
                                        value={user.password}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </Box>
                        </Box>
                        <Box className={classes.signUp__containerButton}>
                            <Button 
                                fullWidth 
                                color="primary" 
                                type="submit"
                                variant="contained"
                                onClick={handleSignUp}>
                                SIGN UP
                            </Button>
                        </Box>
                    </Box>
                </form>
            </div>
        </Modal>
    )
};

const mapStateToProps = (state: RootState): ISignUpStateToProps => ({
    open: state.system.open || { open: false, component: '' }
});

const mapDispatchToProps: ISignUpActionsToProps = {
    logInSuccess,
    snackError,
    snackSuccess,
    changeOpenHelper
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);