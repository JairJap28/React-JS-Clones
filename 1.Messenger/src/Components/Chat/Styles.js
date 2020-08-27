import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
    message: {
        padding: 10,
        margin: 10,
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
        padding: '10px 10px 0 10px !important',
        textAlign: 'left',
        '&:last-child': {
            paddingBottom: 0,
        }
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
        textAlign: 'left',
        marginRight: '20px !important'
    },
    message__time__guess: {
        textAlign: 'right',
        marginLeft: '20px !important'
    }
}));

export default useStyles;