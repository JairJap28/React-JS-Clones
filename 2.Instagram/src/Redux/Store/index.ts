import { combineReducers } from 'redux';

// Reducers
import systemReducer from '../Reducers/systemReducer';

const rootReducer = combineReducers({
    system: systemReducer
});

export type RootState = ReturnType<typeof rootReducer>;