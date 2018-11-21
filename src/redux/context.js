import Immutable from 'seamless-immutable';
import _ from 'lodash';
import appointmentsReducer from './context/appointments';

export default function contextReducer(passedState: ContextState = Immutable({}), action: Action) {
    const state = _.reduce([
        appointmentsReducer,
    ], (s, reducer) => reducer(s, action), passedState);
  
    switch (action.type) {  
        default:
            return state;
    }
}