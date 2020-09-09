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
    header__container: {
        width: '100%',
        maxWidth: 1000,
        margin: 'auto'
    },
    header__img__logo:{
        
    },
    header__menu: {
        width: 150,
        position: 'relative',
        overflow: 'visible !important',
        '&::before': {
            content: "''",
            width: 15,
            height: 15,
            background: 'white',
            position: 'absolute',
            top: -8,
            right: 53,
            borderTop: theme.custom.border.type1,
            borderLeft: theme.custom.border.type1,
            transform: 'rotate(45deg)',
        }
    },
    header__menu__items:{
    }
}));

export default useStyles;