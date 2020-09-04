import createMuiTheme, { Theme }  from '@material-ui/core/styles/createMuiTheme';

declare module "@material-ui/core/styles/createMuiTheme" {
    interface Theme {
        custom: {
            border: {
                type1: string;
            };
        }
    }
    // allow configuration using `createMuiTheme`
    interface ThemeOptions {
        custom?: {
            border?: {
                type1?: string;
            };
        };
    }
}

export interface ICustomTheme extends Theme {
    
}

const theme = createMuiTheme({
    palette: {
        common: {
            black: '#000',
            white: '#fff'
        },
        background: {
            default: '#fafafa'
        },
    },
    custom: {
        border: {
            type1: '1px solid lightgray'
        } 
    }
});

export default theme;