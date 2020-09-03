// Models
import { User as FirebaseUser } from 'firebase';
import { ISnackBarProps } from './UI/ISnackBar';

interface ISystemState {
    user?: FirebaseUser,
    snackbar?: ISnackBarProps,
    open?: boolean
}

export default ISystemState;