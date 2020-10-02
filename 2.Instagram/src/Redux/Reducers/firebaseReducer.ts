import {
    LOG_IN_SUCCESS,
    LOG_OUT,
    FirebaseActionTypes
} from '../Types';
import { REHYDRATE } from 'redux-persist';

// Models
import IFirebaseState from '../../Models/IFirebaseState';

const initialState: IFirebaseState = {

}

function firebaseReducer(
    state = initialState,
    action: FirebaseActionTypes | any
): IFirebaseState {
    switch(action.type){
        case REHYDRATE:
            debugger;
            return {
                ...state,
                user: action.payload.firebase?.user
            }
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