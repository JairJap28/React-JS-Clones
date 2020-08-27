import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    input__form: {
        position: 'fixed',
        bottom: 0,
        zIndex: 1,
        backgroundColor: '#e9e9e9',
        width: '75%',
        margin: 20,
        borderRadius: 10
    },
    input__formControl: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    input__box: {
        padding: '15px 15px 10px 15px'
    },
    input__input: {
        width: '100%'
    },
}));

export default useStyles;