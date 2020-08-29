// Redux
import {
    createStore,
    applyMiddleware,
    combineReducers
} from 'redux';
import {
    reduxFirestore,
    getFirestore,
    firestoreReducer,
    createFirestoreInstance
} from 'redux-firestore';
import {
    firebaseReducer,
    getFirebase
} from 'react-redux-firebase';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// Reducers
import uiReducer from './Reducers/UiReducer';

// Firebase
import fbConfig from '../Firebase/firebase';
import firebase from 'firebase';

const rootReducer = combineReducers({
    ui: uiReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

const composeEnhancers = composeWithDevTools({

});

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        reduxFirestore(firebase, fbConfig)
    )
);

export const rrfProps = {
    firebase: firebase,
    config: fbConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
};

export default store;