import {
    SystemActionTypes,
    LOG_IN_SUCCESS
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
        case LOG_IN_SUCCESS:
            return {
                ...state,
                user: action.payload
            };
        default: return state;
    }
}

export default systemReducer;