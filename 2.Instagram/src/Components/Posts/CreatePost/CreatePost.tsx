import React, { useState, useEffect } from 'react';
import useStyles from './Styles';

// Redux
import { connect } from 'react-redux';
import { RootState } from '../../../Redux/Store/index';
import { changeOpenHelper } from '../../../Redux/Actions/systemActions';

// Firebase
import { db, storage } from '../../../Firebase/Firebase';

// Models
import IOpenHelper from '../../../Models/UI/IOpenHelper';
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

const CreatePost: React.FC<ICreatePost> = (props) => {
    const classes = useStyles();
    const [caption, setCaption] = useState<string>('');
    const [image, setImage] = useState<any>(null);
    const [progress, setProgress] = useState<0>(0);
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
    }

    const handleClose = () => {
        setCaption('');
        setImage(null);
        props.changeOpenHelper(false, '');
    }

    return (
        <Dialog open={open}>
            <div className={classes.create__title}>
                <Typography variant="h5">
                    Let the world...
                </Typography>
                <Typography variant="subtitle2">
                    To see what you want to show.
                </Typography>
            </div>
            <DialogContent>
                <div>
                    <h1>abc</h1>
                    <input 
                        type="text" 
                        placeholder="Enter a caption..."
                        onChange={handleOnChange}
                        value={caption}/>
                    <input 
                        type="file"
                        onChange={handleFileChange}/>
                </div>
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
                    onClick={handleClose}>
                    Publish
                </Button>
            </DialogActions>
        </Dialog>
    )
};

const mapStateToProps = (state: RootState): ICreateStateToProps => ({
    open: state.system.open || { open: false, component: '' }
})

const mapDispatchToProps: ICreateActionsToProps = {
    changeOpenHelper
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)
