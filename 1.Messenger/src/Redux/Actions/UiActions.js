import {
    SET_USERNAME
} from '../Types';

export const setUsername = (username) => {
    return (dispatch) => {
        dispatch({
            type: SET_USERNAME,
            payload: username
        });
    }
}