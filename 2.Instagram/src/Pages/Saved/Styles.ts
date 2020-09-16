import makeStyles from '@material-ui/core/styles/makeStyles';
import { ICustomTheme } from '../../Config/Layout/Theme';

const useStyles = makeStyles((theme: ICustomTheme) => ({
    saved__tabs: {
        flexGrow: 1,
    },
    like__container: {
        maxWidth: 1000
    },
    like__item: {
        maxWidth: 293,
        maxHeight: 293,
        width: '100%',
        height: '100%',
        margin: 15,
    },
    like__image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderTop: theme.custom.border.type1,
        borderBottom: theme.custom.border.type1
    },
}));

export default useStyles;