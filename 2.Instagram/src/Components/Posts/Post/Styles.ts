import makeStyles from '@material-ui/core/styles/makeStyles';
import { ICustomTheme } from '../../../Config/Layout/Theme';

const useStyles = makeStyles((theme: ICustomTheme) => ({
    post: {
        minWidth: 350,
        maxWidth: 656,
        marginBottom: 45,
        border: theme.custom.border.type1,
        backgroundColor: theme.palette.common.white
    },
    post__header: {
        width: '100%',
        padding: 15
    },
    post__header__user: {
        display: 'flex',
        alignItems: 'center'
    },
    post__avatar: {
        marginRight: 10
    },
    post__image: {
        width: '100%',
        maxHeight: 600,
        objectFit: 'contain',
        borderTop: theme.custom.border.type1,
        borderBottom: theme.custom.border.type1
    },
    post__comments: {
        padding: 20
    },
    post__form__comment: {
        borderTop: theme.custom.border.type1
    },
    post__likes: {
        paddingLeft: 20
    },
    post__likes__liked: {
        color: 'red'
    },
    post__text: {
        fontWeight: 'normal',
        padding: '10px 15px 10px 20px'
    },
    post__input: {
        padding: '10px !important'
    }
}));

export default useStyles;