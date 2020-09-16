import { User as FirebaseUser } from 'firebase';
import { 
    SystemActionTypes, 
    FirebaseActionTypes 
} from '../../Redux/Types';
import { RouteComponentProps } from 'react-router-dom';

export interface IHeaderStateToProps {
    user?: FirebaseUser
}

export interface IHeaderActionsToProps {
    logOut: () => FirebaseActionTypes | undefined,
    snackInfo: (message: string) => SystemActionTypes,
    changeOpenHelper: (state: boolean, component: string) => SystemActionTypes | undefined
}

//Child component related stuff
interface ChildComponentProps extends RouteComponentProps<any> {}

type IHeaderPost = IHeaderStateToProps & IHeaderActionsToProps & ChildComponentProps;
export default IHeaderPost;