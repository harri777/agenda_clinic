import urlApi from '../../config/api';
import Api from '../../helpers/api'; 
import history from '../../history';
import { push } from 'react-router-redux'
// ------------------------------------
// Constants
// ------------------------------------

const APPOINTMENTS = 'appointments.APPOINTMENTS';
const APPOINTMENTS_SUCCESS = 'appointments.APPOINTMENTS_SUCCESS';
const APPOINTMENTS_FAILED = 'appointments.APPOINTMENTS_FAILED';

// ------------------------------------
// Actions
// -----------------------------------

export const getAppointments = () => (
    (dispatch: Dispatch) => {
        dispatch({ type: APPOINTMENTS });
        Api.get("events", {
            // data,
            header: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        } , true).then
            (res => {
                console.log(res)
                dispatch({
                    type: APPOINTMENTS_SUCCESS,
                    data: res,
                });
            })
        .catch(error => {
            console.log(error)
            dispatch({
                type: APPOINTMENTS_FAILED,
                error: error,
            });
            
        });
    }
);

// const getData = (data) => new Promise((resolve, reject) => {
//     Api.post(``, {
//         data,
//         header: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
//     }, false).then
//         (response => {
//             return resolve(response);
//         })
//     .catch(error => {
//         console.log(error)
//         return reject(error)
//     });
// })

export const appointmentsActions = {
    getAppointments,
};

export default function appointmentsReducer (state, action): ContextState {
    switch (action.type) {
        case APPOINTMENTS:
            return state
            .setIn(['appointments', 'isLoading'], true)
            .setIn(['appointments', 'errors'], null);
  
        case APPOINTMENTS_SUCCESS:
            return state
            .setIn(['appointments', 'isLoading'], false)
            .setIn(['appointments', 'errors'], null)
            .setIn(['appointments', 'data'], action.data);
  
        case APPOINTMENTS_FAILED:
            return state
            .setIn(['appointments', 'isLoading'], false)
            .setIn(['appointments', 'errors'], [action.error.message]);
  
        default:
            return state;
    }
}