import { SystemActionTypes } from '../../../Redux/Types';
import { IPost } from '../../../Models/IPost';

export interface IPostStateToProps extends IPost {
    loggedUser: string,
    userUid: string
}

export interface IPostActionToProps {
    snackInfo: (message: string) => SystemActionTypes
}

type IPostProps = IPostStateToProps & IPostActionToProps;
export default IPostProps;