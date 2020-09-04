import IOpenHelper from '../../../Models/UI/IOpenHelper';
import { SystemActionTypes } from '../../../Redux/Types';

export interface ICreateStateToProps {
    open: IOpenHelper
}

export interface ICreateActionsToProps {
    changeOpenHelper: (state: boolean, component: string) => SystemActionTypes;
}

type ICreatePost = ICreateStateToProps & ICreateActionsToProps;
export default ICreatePost;