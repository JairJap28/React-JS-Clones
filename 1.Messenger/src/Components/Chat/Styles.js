import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
    message: {
        padding: 5,
        width: 'fit-content'
    },
    message__user: {
        marginLeft: 'auto',
        color: 'white',
        textAlign: 'left',
    },
    message__userCard: {
        backgroundColor: '#0b81ff !important',
    },
    message__guestCard: {
        backgroundColor: '#e9e9e9 !important',
    },
    message__username: {
        textAlign: 'left',
        fontWeight: 'bold !important',
    },
    message__cardContent: {
        padding: props => props.isUser ? '5px 10px 10px 10px !important': '10px 10px 0 10px !important',
        textAlign: 'left',
        '&:last-child': {
            paddingBottom: 0,
        }
    },
    message__user__content: {
        textAlign: 'right'
    },
    message__guest__content: {
        textAlign: 'left'
    },
    message__cardActions: {
        padding: '0px 5px 5px !important'
    },
    message__time: {
        width: '100%',
        fontSize: '12px !important',
        color: '#636363'
    },
    message__time__user: {
        textAlign: 'right',
        marginLeft: '20 !important',
        color: '#353131'
    },
    message__time__guess: {
        textAlign: 'right',
        marginRight: '20 !important'
    }
}));

export default useStyles;