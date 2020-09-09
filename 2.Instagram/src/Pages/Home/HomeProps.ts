// Models
import { User as FirebaseUser} from 'firebase';
import {
    FirebaseActionTypes,
    SystemActionTypes
} from '../../Redux/Types';

export interface IHomeStateToProps {
    user?: FirebaseUser,
    open: boolean,
}

export interface IHomeActionsToProps {
    logOut: () => FirebaseActionTypes | undefined,
    changeOpenHelper: (state: boolean, component: string) => SystemActionTypes | undefined
}

type HomeProps = IHomeStateToProps & IHomeActionsToProps;

export default HomeProps;

