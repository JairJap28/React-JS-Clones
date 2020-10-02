import { 
    combineReducers,
    createStore,
    applyMiddleware,
    StoreEnhancer,
    compose
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


// Reducers
import systemReducer from '../Reducers/systemReducer';
import firebaseReducer from '../Reducers/firebaseReducer';

const persistConfig = {
    key: 'root',
    storage,
}

const userPersistConfig = {
    key: 'user',
    storage,
    whitelist: ['firebase']
}

const rootReducer = combineReducers({
    system: systemReducer,
    firebase: persistReducer(userPersistConfig, firebaseReducer),
});

export type RootState = ReturnType<typeof rootReducer>;

type WindowWithDevTools = Window & {
    __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer<unknown, {}>
}

const composeEnhancers: typeof compose = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    pReducer,
    composeEnhancers(
        applyMiddleware(
            thunk,
        )
    )
);

export const persistor = persistStore(store);
