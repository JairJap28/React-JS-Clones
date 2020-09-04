import makeStyles from '@material-ui/core/styles/makeStyles';
import { ICustomTheme } from '../../../Config/Layout/Theme';

const useStyles = makeStyles((theme: ICustomTheme) => ({
    post: {
        minWidth: 350,
        maxWidth: 760,
        marginBottom: 45,
        border: theme.custom.border.type1,
        backgroundColor: theme.palette.common.white
    },
    post__header: {
        display: 'flex',
        alignItems: 'center',
        padding: 20
    },
    post__avatar: {
        marginRight: 10
    },
    post__image: {
        width: '100%',
        objectFit: 'contain',
        borderTop: theme.custom.border.type1,
        borderBottom: theme.custom.border.type1
    },
    post__text: {
        fontWeight: 'normal',
        padding: 20
    }
}));

export default useStyles;