import createMuiTheme  from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
    palette: {
        common: {
            black: '#000',
            white: '#fff'
        },
        background: {
            default: '#fafafa'
        }
    }
});

export default theme;