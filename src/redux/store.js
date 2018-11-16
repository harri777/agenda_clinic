import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import makeRootReducer from './combined';
import { routerMiddleware } from 'react-router-redux'
import localStorageDump from './middleware/localStorageDump'; 

export default (initialState,browserHistory) => {
    const middleware = [thunk,routerMiddleware(browserHistory)];
    middleware.push(localStorageDump);
    const enhancers = [];
    let composeEnhancers = compose;

    const store = createStore(
        makeRootReducer(),
        initialState,
        composeEnhancers(
            applyMiddleware(...middleware),
            ...enhancers,
        ),
    );
    store.asyncReducers = {};
    return store;
};
