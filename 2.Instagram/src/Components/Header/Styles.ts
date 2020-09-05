import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    header__main: {
        minWidth: 370,
        padding: 20,
        objectFit: 'contain',
        borderBottom: '1px solid lightgray',
        backgroundColor: theme.palette.common.white
    },
    header__img__logo:{
        
    }
}));

export default useStyles;