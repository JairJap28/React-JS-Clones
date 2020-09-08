import {
    LOG_IN_SUCCESS,
    LOG_OUT,
    FirebaseActionTypes
} from '../Types';

// Models
import IFirebaseState from '../../Models/IFirebaseState';

const initialState: IFirebaseState = {

}

function firebaseReducer(
    state = initialState,
    action: FirebaseActionTypes
): IFirebaseState {
    switch(action.type){
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
        default: return state;
    }
}

export default firebaseReducer;