// Models
import { User as FirebaseUser } from 'firebase';
import { ISnackBarProps } from '../Models/UI/ISnackBar';
import IOpenHelper from '../Models/UI/IOpenHelper';

// UI
export const SNACKBAR_MESSAGE = "SNACKBAR_MESSAGE";
export const OPEN_HELPER = "OPEN_HELPER";
export const CLEAR_UI = "CLEAR_UI";

// Firebase
export const FIREBASE_GET_POSTS = "FIREBASE_GET_POSTS";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_OUT = "LOG_OUT";

interface LogInSuccessfully {
    type: typeof LOG_IN_SUCCESS,
    payload: FirebaseUser
};

interface LogOut {
    type: typeof LOG_OUT
}

interface SnackBarMessage {
    type: typeof SNACKBAR_MESSAGE,
    payload: ISnackBarProps
};

interface OpenHelper {
    type: typeof OPEN_HELPER,
    payload: IOpenHelper
}

interface ClearUI {
    type: typeof CLEAR_UI
}

export type SystemActionTypes = LogInSuccessfully 
    | SnackBarMessage | LogOut | OpenHelper
    | ClearUI;