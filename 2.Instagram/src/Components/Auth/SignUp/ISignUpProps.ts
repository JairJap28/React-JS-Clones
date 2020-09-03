import { User as FirebaseUser } from 'firebase';
import { SystemActionTypes } from '../../../Redux/Types';
import IOpenHelper from '../../../Models/UI/IOpenHelper';

export interface ISignUpStateToProps {
    open: IOpenHelper
}

export interface ISignUpActionsToProps {
    logInSuccess: (user: FirebaseUser) => SystemActionTypes,
    snackError: (message: string) => SystemActionTypes,
    changeOpenHelper: (state: boolean, component: string) => SystemActionTypes
}

type ISignUpProps = ISignUpStateToProps & ISignUpActionsToProps;
export default ISignUpProps;