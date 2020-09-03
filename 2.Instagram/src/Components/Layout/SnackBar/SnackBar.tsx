import React, { useEffect } from 'react';

// Models
import ISnackBar, { 
    ISnackBarProps,
    ISnackBarActions
} from '../../../Models/UI/ISnackBar';

// Redux
import { connect } from 'react-redux';
import { RootState } from '../../../Redux/Store/index';
import { clearUI } from '../../../Redux/Actions/systemActions';

// MUI Stuff
import useStyles from './Styles';
import Snackbar, { SnackbarCloseReason } from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const SnackBar: React.FC<ISnackBar> = (props) => {
    const classes = useStyles();
    const [state, setState] = React.useState<ISnackBarProps>({});

    useEffect(() => {
        setState({
            open: props.open,
            message: props.message,
            severity: props.severity
        });
    }, [props]);
    
    const handleClose = (event: React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }

        props.clearUI();
    };

    
    return (
        <div className={classes.root}>
            <Snackbar open={state.open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={state.severity || "info"}>
                    {state.message}
                </Alert>
            </Snackbar>
        </div>
    )
}

const mapStateToProps = (state: RootState): ISnackBarProps => ({
    open: state.system.snackbar?.open,
    message: state.system.snackbar?.message,
    severity: state.system.snackbar?.severity
})

const mapActionsToProps: ISnackBarActions =  {
    clearUI
}

export default connect(mapStateToProps, mapActionsToProps)(SnackBar);
