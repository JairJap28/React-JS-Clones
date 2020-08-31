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
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
/* Reducers go here */

// Firebase
import firebase from 'firebase';

const rootReducer = combineReducers({
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

const composeEnhancers = composeWithDevTools({

});

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        reduxFirestore(firebase)
    )
);

export const rrfProps: any = {
    firebase: firebase,
    dispatch: store.dispatch,
    createFirestoreInstance
};

export default store;