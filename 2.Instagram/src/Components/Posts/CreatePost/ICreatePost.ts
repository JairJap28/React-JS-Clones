import IOpenHelper from '../../../Models/UI/IOpenHelper';
import { SystemActionTypes } from '../../../Redux/Types';

export interface ICreateStateToProps {
    open: IOpenHelper,
    username: string
}

export interface ICreateActionsToProps {
    snackError: (message: string) => SystemActionTypes,
    changeOpenHelper: (state: boolean, component: string) => SystemActionTypes;
}

type ICreatePost = ICreateStateToProps & ICreateActionsToProps;
export default ICreatePost;