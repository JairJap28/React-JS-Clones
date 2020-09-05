import React, { useState, useEffect } from 'react';
import useStyles from './Styles';

// Models
import { IUserLogin } from '../../../Models/IUserLogin';
import ISignInProps,{
    ISignInMapToProps,
    ISignInActionToProps
} from './ISignInProps';

// Firebase
import { auth } from '../../../Firebase/Firebase';
import { User as FirebaseUser } from 'firebase';

// Redux
import { connect } from 'react-redux';
import { 
    logInSuccess,
    snackError,
    snackSuccess,
    changeOpenHelper
} from '../../../Redux/Actions/systemActions';
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

const SignIn: React.FC<ISignInProps> = (props) => {
    const displayName = 'SignIn';
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
        setUser({username: '', email: '', password: ''});
        props.changeOpenHelper(false, '');
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    const handleSignIn = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();

        auth
        .signInWithEmailAndPassword(user.email, user.password)
        .then(() => {
            handleClose();
            props.snackSuccess('Logged In Successfully');
        })
        .catch((error: any) => props.snackError(error.message));
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}>
            <div style={modalStyle} className={classes.signIn__paper}>
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
                                <FormControl fullWidth className={classes.signIn__formControl}>
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
                                <FormControl fullWidth className={classes.signIn__formControl}>
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
                        <Box className={classes.signIn__containerButton}>
                            <Button 
                                fullWidth 
                                color="primary" 
                                type="submit"
                                variant="contained"
                                onClick={handleSignIn}>
                                SIGN UP
                            </Button>
                        </Box>
                    </Box>
                </form>
            </div>
        </Modal>
    )
};

const mapStateToProps = (state: RootState): ISignInMapToProps => ({
    open: state.system.open || { open: false, component: '' }
});

const mapDispatchToProps: ISignInActionToProps = {
    logInSuccess,
    snackError,
    snackSuccess,
    changeOpenHelper
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);