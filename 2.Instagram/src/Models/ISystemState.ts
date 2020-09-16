// Models
import { ISnackBarProps } from './UI/ISnackBar';
import IOpenHelper from './UI/IOpenHelper';

interface ISystemState {
    snackbar?: ISnackBarProps,
    open?: IOpenHelper
}

export default ISystemState;