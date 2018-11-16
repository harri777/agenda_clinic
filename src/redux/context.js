import Immutable from 'seamless-immutable';
import _ from 'lodash';
import mainReducer from './context/main';



export default function contextReducer(passedState: ContextState = Immutable({}), action: Action) {
    const state = _.reduce([
        mainReducer,
    ], (s, reducer) => reducer(s, action), passedState);
  
    switch (action.type) {  
        default:
            return state;
    }
}