import { User as FirebaseUser } from 'firebase';
import { SystemActionTypes } from '../../Redux/Types';
import IOpenHelper from '../../Models/UI/IOpenHelper';
import { RouteComponentProps } from 'react-router-dom';

export interface ISavedStateToProps {
    user?: FirebaseUser,
    open: IOpenHelper
}

export interface ISavedActionsToProps {
    changeOpenHelper: (state: boolean, component: string) => SystemActionTypes
}

interface ChildComponentProps extends RouteComponentProps<any> {}

type SavedProps = ISavedStateToProps & ISavedActionsToProps & ChildComponentProps;
export default SavedProps;