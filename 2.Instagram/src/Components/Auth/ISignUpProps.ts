import { User as FirebaseUser } from 'firebase';
import { SystemActionTypes } from '../../Redux/Types';

export default interface ISignUpProps {
    open: boolean,
    logInSuccess: (user: FirebaseUser) => SystemActionTypes,
    snackError: (message: string) => SystemActionTypes,
    changeOpenHelper: (state: boolean) => SystemActionTypes
}