import { combineReducers } from 'redux';
import contextReducer from './context';
import { routerReducer } from 'react-router-redux'

export const makeRootReducer = (asyncReducers) => (
    combineReducers({
        context: contextReducer,
        router: routerReducer,
        ...asyncReducers,
    })
);

export const injectReducer = (store, { key, reducer }) => {
    if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;
  
    store.asyncReducers[key] = reducer;
    store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
