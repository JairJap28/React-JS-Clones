import React, { useState, useEffect } from 'react';
import useStyles from './Styles';

// Redux
import { connect } from 'react-redux';
import { RootState } from '../../../Redux/Store/index';
import { 
    changeOpenHelper,
    snackError
} from '../../../Redux/Actions/systemActions';

// Firebase
import firebase from 'firebase';
import { db, storage } from '../../../Firebase/Firebase';

// Models
import ICreatePost, {
    ICreateStateToProps,
    ICreateActionsToProps    
} from './ICreatePost';

// MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';

const CreatePost: React.FC<ICreatePost> = (props) => {
    const classes = useStyles();
    const [caption, setCaption] = useState<string>('');
    const [image, setImage] = useState<any>(null);
    const [progress, setProgress] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        setOpen(props.open.component === 'CreatePost' && props.open.open);
    }, [props]);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCaption(event.target.value);
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on("state_changed", (snapshot: firebase.storage.UploadTaskSnapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
        }, (error: Error) => {
            console.log(error);
            props.snackError(error.message);
        }, () => {
            storage.ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url: string) => {
                db.collection("posts").add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    caption,
                    imageUrl: url,
                    username: props.username
                });

                setProgress(0);
                setCaption('');
                setImage(null);
            });
        });
    }

    const handleClose = () => {
        setCaption('');
        setImage(null);
        props.changeOpenHelper(false, '');
    }

    return (
        <Dialog open={open} maxWidth="sm" fullWidth>
            <div className={classes.create__title}>
                <Typography variant="h5">
                    Let the world...
                </Typography>
                <Typography variant="subtitle2">
                    To see what you want to show.
                </Typography>
            </div>
            <DialogContent>
                <Box display="flex" flexDirection="column">
                    <Box>
                        <LinearProgress 
                            variant="determinate" 
                            value={progress} 
                            className={classes.create__progressBar}/>
                    </Box>
                    <Box>
                        <TextField
                            label="Caption"
                            multiline
                            rowsMax={2}
                            fullWidth
                            variant="filled"
                            onChange={handleOnChange}
                            value={caption}
                            className={classes.create__caption}/>
                    </Box>
                    <Box>
                        <input 
                            type="file"
                            onChange={handleFileChange}/>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button 
                    fullWidth
                    color="secondary"
                    variant="contained"
                    onClick={handleClose}>
                    Cancel
                </Button>
                <Button 
                    fullWidth
                    color="primary"
                    variant="contained"
                    onClick={handleUpload}>
                    Publish
                </Button>
            </DialogActions>
        </Dialog>
    )
};

const mapStateToProps = (state: RootState): ICreateStateToProps => ({
    open: state.system.open || { open: false, component: '' },
    username: state.system.user?.displayName || ''
})

const mapDispatchToProps: ICreateActionsToProps = {
    changeOpenHelper,
    snackError
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)
