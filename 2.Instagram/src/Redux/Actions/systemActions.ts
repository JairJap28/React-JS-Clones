import { User as FirebaseUser } from 'firebase';

// Types
import {
    LOG_IN_SUCCESS,
    SystemActionTypes
} from '../Types';

export function logInSuccess(user: FirebaseUser): SystemActionTypes {
    return {
        type: LOG_IN_SUCCESS,
        payload: user
    }
};