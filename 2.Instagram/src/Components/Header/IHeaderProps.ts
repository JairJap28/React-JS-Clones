import { User as FirebaseUser } from 'firebase';
import { SystemActionTypes } from '../../Redux/Types';

export interface IHeaderStateToProps {
    user?: FirebaseUser
}

export interface IHeaderActionsToProps {
    logOut: () => SystemActionTypes | undefined,
    snackInfo: (message: string) => SystemActionTypes,
    changeOpenHelper: (state: boolean, component: string) => SystemActionTypes | undefined
}

type IHeaderPost = IHeaderStateToProps & IHeaderActionsToProps;
export default IHeaderPost;