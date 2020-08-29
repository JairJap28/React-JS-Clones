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
    },
    header__iconButton: {
        backgroundColor: '#00AAFD !important',
        color: '#fff !important',
        padding: '5px !important',
        borderWidth: props => props.isUser ? null : '2px !important',
        borderStyle: props => props.isUser ? null : 'solid !important',
        borderColor: props => props.isUser ? null : 'red !important'
    }
}));

export default useStyles;