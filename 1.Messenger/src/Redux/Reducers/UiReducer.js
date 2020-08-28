import {
    SET_USERNAME
} from '../Types';

const initialState = {
    username: ''
}

const uiReducer = (state = initialState, action) => {
    if(action.type === SET_USERNAME) {
        return {
            ...state,
            username: action.payload
        }
    }
    return state;
}

export default uiReducer;