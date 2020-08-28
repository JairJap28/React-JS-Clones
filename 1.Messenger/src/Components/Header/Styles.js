import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
    header__box: {
        padding: '5px 20px 5px 30px',
        background: '#e0e0e0',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15
    },
    header__input__username: {
        padding: '5px 10px 10px 10px !important',
        background: 'white'
    },
    header__label__username: {
        top: '-',
        left: '-'
    },
    header__iconButton: {
        backgroundColor: '#00AAFD !important',
        color: '#fff !important'
    }
}));

export default useStyles;