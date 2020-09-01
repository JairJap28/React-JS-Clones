import React, { useState, useEffect } from 'react';
import useStyles from './Styles';

// Models
import { IUserLogin } from '../../Models/IUserLogin';
import ISignUpProps from './ISignUpProps';

// Firebase
import { auth } from '../../Firebase/Firebase';
import { User as FirebaseUser } from 'firebase';

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
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(props.open);
    const [modalStyle] = React.useState(getModalStyle);
    const [user, setUser] = React.useState<IUserLogin>({ email: '', password: '', username: '' });
    const [firebaseUser, setFirebaseUser] = React.useState<FirebaseUser | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser: FirebaseUser | null ) => {
            if(authUser) {
                // User has log in
                
                console.log(authUser);
                setFirebaseUser(authUser);

                if(authUser.displayName) {

                } else {
                    return authUser.updateProfile({
                        displayName: user.username
                    });
                }

            } else {
                // User has log out
            }
        });

        return () => {
            // Perform some cleanup actions
            unsubscribe();
        }
    }, [firebaseUser, user.username]);

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    const handleSignUp = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();

        auth
        .createUserWithEmailAndPassword(user.email, user.password)
        .catch((error: any) => alert(error.message));
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
                            <Box>
                                <FormControl fullWidth>
                                    <InputLabel>Username</InputLabel>
                                    <Input
                                        type="text"
                                        name="username"
                                        value={user.username}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth>
                                    <InputLabel>Email</InputLabel>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth>
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

export default SignUp;