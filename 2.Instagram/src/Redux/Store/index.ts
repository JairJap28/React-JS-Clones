import { 
    combineReducers,
    createStore,
    applyMiddleware,
    StoreEnhancer,
    compose
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
import systemReducer from '../Reducers/systemReducer';
import firebaseReducer from '../Reducers/firebaseReducer';

const rootReducer = combineReducers({
    system: systemReducer,
    firebase: firebaseReducer
});

export type RootState = ReturnType<typeof rootReducer>;

type WindowWithDevTools = Window & {
    __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer<unknown, {}>
}

const composeEnhancers: typeof compose = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

export default store;