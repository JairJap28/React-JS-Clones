// Types
import {
    CLEAR_UI,
    OPEN_HELPER,
    SNACKBAR_MESSAGE,
    SystemActionTypes
} from '../Types';

export function changeOpenHelper(state: boolean, component: string): SystemActionTypes {
    return {
        type: OPEN_HELPER,
        payload: {
            open: state,
            component
        }
    }
}

export function clearUI(): SystemActionTypes {
    return {
        type: CLEAR_UI
    }
}

export function snackError(message: string): SystemActionTypes {
    return snack(message, "error");
}

export function snackInfo(message: string): SystemActionTypes {
    return snack(message, "info");
}

export function snackSuccess(message: string): SystemActionTypes {
    return snack(message, "success");
}

function snack(message: string, type: string): SystemActionTypes {
    return {
        type: SNACKBAR_MESSAGE,
        payload: {
            message,
            open: true,
            severity: type
        }
    };
}