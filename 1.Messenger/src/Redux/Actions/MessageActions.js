import {
    SUCCESS_MESSAGE,
    ERROR_MESSAGE
} from '../Types';

export const sendMessage = (message) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();

        firestore.collection('messages').add(message)
        .then(() => {
            dispatch({ type: SUCCESS_MESSAGE });
        }).catch(err => {
            dispatch({
                type: ERROR_MESSAGE,
                err
            });
        });
    }
};