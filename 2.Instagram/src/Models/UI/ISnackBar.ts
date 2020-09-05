import { SystemActionTypes } from '../../Redux/Types';

export interface ISnackBarProps {
    open?: boolean,
    message?: string,
    severity?: string
}

export interface ISnackBarActions {
    clearUI: () => SystemActionTypes
}

type ISnackBar = ISnackBarProps & ISnackBarActions;

export default ISnackBar;