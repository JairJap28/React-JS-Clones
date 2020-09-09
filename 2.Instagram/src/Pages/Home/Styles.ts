import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
    app: {

    },
    app__header: {
        position: 'sticky',
        width: '100%',
        top: 0,
        zIndex: 1
    },
    app__posts: {
        padding: 10
    },
    app__embed: {
        overflow: 'auto'
    }
}));

export default useStyles;