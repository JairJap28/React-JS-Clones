import {
    SystemActionTypes,
    CLEAR_UI,
    OPEN_HELPER,
    LOG_OUT,
    LOG_IN_SUCCESS,
    SNACKBAR_MESSAGE
} from '../Types';

// Models
import ISystemState from '../../Models/ISystemState';

const initialState: ISystemState = {
};

function systemReducer(
    state = initialState,
    action: SystemActionTypes
): ISystemState {
    switch(action.type){
        case CLEAR_UI: 
            return {
                ...state,
                snackbar: undefined
            };
        case SNACKBAR_MESSAGE:
            return {
                ...state,
                snackbar: action.payload
            };
        case LOG_IN_SUCCESS:
            return {
                ...state,
                user: action.payload
            };
        case LOG_OUT:
            return  {
                ...state,
                user: undefined
            };
        case OPEN_HELPER:
            return {
                ...state,
                open: action.payload
            };
        default: return state;
    }
}

export default systemReducer;