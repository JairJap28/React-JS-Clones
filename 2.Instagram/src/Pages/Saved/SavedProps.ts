import { User as FirebaseUser } from 'firebase';
import { SystemActionTypes } from '../../Redux/Types';
import IOpenHelper from '../../Models/UI/IOpenHelper';

export interface ISavedStateToProps {
    user?: FirebaseUser,
    open: IOpenHelper
}

export interface ISavedActionsToProps {
    changeOpenHelper: (state: boolean, component: string) => SystemActionTypes
}

type SavedProps = ISavedStateToProps & ISavedActionsToProps;
export default SavedProps;