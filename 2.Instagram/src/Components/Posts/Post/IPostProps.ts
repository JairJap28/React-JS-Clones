import { SystemActionTypes } from '../../../Redux/Types';

export interface IPostStateToProps {
    postId: string,
    username: string, 
    imageUrl: string,
    caption: string,
    time: any,
    loggedUser: string
}

export interface IPostActionToProps {
    snackInfo: (message: string) => SystemActionTypes
}

type IPostProps = IPostStateToProps & IPostActionToProps;
export default IPostProps;