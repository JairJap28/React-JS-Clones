import { User as FirebaseUser } from 'firebase';
import { 
    SystemActionTypes,
    FirebaseActionTypes
} from '../../../Redux/Types';
import IOpenHelper from '../../../Models/UI/IOpenHelper';

export interface ISignInMapToProps {
    open: IOpenHelper
}

export interface ISignInActionToProps {
    logInSuccess: (user: FirebaseUser) => FirebaseActionTypes,
    snackError: (message: string) => SystemActionTypes,
    snackSuccess: (message: string) => SystemActionTypes,
    changeOpenHelper: (state: boolean, component: string) => SystemActionTypes
}

type ISignInProps = ISignInMapToProps & ISignInActionToProps;
export default ISignInProps;