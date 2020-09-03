import { auth } from '../../Firebase/Firebase';
import { User as FirebaseUser } from 'firebase';

// Types
import {
    CLEAR_UI,
    LOG_OUT,
    LOG_IN_SUCCESS,
    OPEN_HELPER,
    SNACKBAR_MESSAGE,
    SystemActionTypes
} from '../Types';

export function changeOpenHelper(state: boolean): SystemActionTypes {
    return {
        type: OPEN_HELPER,
        payload: state
    }
}

export function clearUI(): SystemActionTypes {
    return {
        type: CLEAR_UI
    }
}

export function logInSuccess(user: FirebaseUser): SystemActionTypes {
    return {
        type: LOG_IN_SUCCESS,
        payload: user
    }
};

export function snackError(message: string): SystemActionTypes {
    return {
        type: SNACKBAR_MESSAGE,
        payload: {
            message,
            open: true,
            severity: "error"
        }
    };
}

export function logOut(): SystemActionTypes {
    auth.signOut();
    return {
        type: LOG_OUT
    };
}