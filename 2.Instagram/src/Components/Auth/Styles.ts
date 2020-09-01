import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    signUp__paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    signUp__containerButton: {
        marginTop: 15
    }
}));

export default useStyles;