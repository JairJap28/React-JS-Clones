import {
    SystemActionTypes,
    CLEAR_UI,
    OPEN_HELPER,
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
        case OPEN_HELPER:
            return {
                ...state,
                open: action.payload
            };
        default: return state;
    }
}

export default systemReducer;