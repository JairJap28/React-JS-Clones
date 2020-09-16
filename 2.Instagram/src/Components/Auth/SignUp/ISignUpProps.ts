import { User as FirebaseUser } from 'firebase';
import { 
    SystemActionTypes, 
    FirebaseActionTypes 
} from '../../../Redux/Types';
import IOpenHelper from '../../../Models/UI/IOpenHelper';

export interface ISignUpStateToProps {
    open: IOpenHelper
}

export interface ISignUpActionsToProps {
    logInSuccess: (user: FirebaseUser) => FirebaseActionTypes,
    snackError: (message: string) => SystemActionTypes,
    snackSuccess: (message: string) => SystemActionTypes,
    changeOpenHelper: (state: boolean, component: string) => SystemActionTypes
}

type ISignUpProps = ISignUpStateToProps & ISignUpActionsToProps;
export default ISignUpProps;