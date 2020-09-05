// Models
import { User as FirebaseUser } from 'firebase';
import { ISnackBarProps } from './UI/ISnackBar';
import IOpenHelper from './UI/IOpenHelper';

interface ISystemState {
    user?: FirebaseUser,
    snackbar?: ISnackBarProps,
    open?: IOpenHelper
}

export default ISystemState;