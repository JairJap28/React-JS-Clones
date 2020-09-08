// Models
import { 
    auth,
    db
} from '../../Firebase/Firebase';
import { User as FirebaseUser } from 'firebase';


// Types
import {
    LOG_OUT,
    LOG_IN_SUCCESS,
    FirebaseActionTypes
} from '../Types';

export function logInSuccess(user: FirebaseUser): FirebaseActionTypes {
    return {
        type: LOG_IN_SUCCESS,
        payload: user
    }
};

export function logOut(): FirebaseActionTypes {
    auth.signOut();
    return {
        type: LOG_OUT
    };
}