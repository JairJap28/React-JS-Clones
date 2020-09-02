import { User as FirebaseUser } from 'firebase';

export const FIREBASE_GET_POSTS = "FIREBASE_GET_POSTS";

// Auth
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";

interface LogInSuccessfully {
    type: typeof LOG_IN_SUCCESS,
    payload: FirebaseUser
};

export type SystemActionTypes = LogInSuccessfully;