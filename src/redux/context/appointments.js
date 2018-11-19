import urlApi from '../../config/api';
import Api from '../../helpers/api'; 
import history from '../../history';
import { push } from 'react-router-redux'
// ------------------------------------
// Constants
// ------------------------------------

const GET_APPOINTMENTS = 'appointments.GET_APPOINTMENTS';
const GET_APPOINTMENTS_SUCCESS = 'appointments.GET_APPOINTMENTS_SUCCESS';
const GET_APPOINTMENTS_FAILED = 'appointments.GET_APPOINTMENTS_FAILED';

const INSERT_APPOINTMENTS = 'appointments.INSERT_APPOINTMENTS';
const INSERT_APPOINTMENTS_SUCCESS = 'appointments.INSERT_APPOINTMENTS_SUCCESS';
const INSERT_APPOINTMENTS_FAILED = 'appointments.INSERT_APPOINTMENTS_FAILED';

const UPDATE_APPOINTMENTS = 'appointments.UPDATE_APPOINTMENTS';
const UPDATE_APPOINTMENTS_SUCCESS = 'appointments.UPDATE_APPOINTMENTS_SUCCESS';
const UPDATE_APPOINTMENTS_FAILED = 'appointments.UPDATE_APPOINTMENTS_FAILED';

const DELETE_APPOINTMENTS = 'appointments.DELETE_APPOINTMENTS';
const DELETE_APPOINTMENTS_SUCCESS = 'appointments.DELETE_APPOINTMENTS_SUCCESS';
const DELETE_APPOINTMENTS_FAILED = 'appointments.DELETE_APPOINTMENTS_FAILED';

// ------------------------------------
// Actions
// -----------------------------------

export const getAppointments = () => (
    (dispatch: Dispatch) => {
        dispatch({ type: GET_APPOINTMENTS });
        Api.get("events", {
            header: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        } , true).then
            (res => {
                dispatch({
                    type: GET_APPOINTMENTS_SUCCESS,
                    data: res,
                });
            })
        .catch(error => {
            console.log(error)
            dispatch({
                type: GET_APPOINTMENTS_FAILED,
                error: error,
            });
            
        });
    }
);


export const insertAppointments = (data: Object) => (
    (dispatch: Dispatch) => {
        dispatch({ type: INSERT_APPOINTMENTS });
        Api.post("events", {
            data,
            header: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        } , true).then
            (res => {
                console.log(res)
                dispatch({
                    type: INSERT_APPOINTMENTS_SUCCESS,
                    data: res,
                });
            })
        .catch(error => {
            console.log(error)
            dispatch({
                type: INSERT_APPOINTMENTS_FAILED,
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
    insertAppointments
};

export default function appointmentsReducer (state, action): ContextState {
    switch (action.type) {
        case GET_APPOINTMENTS:
            return state
            .setIn(['appointments', 'isLoading'], true)
            .setIn(['appointments', 'errors'], null);
  
        case GET_APPOINTMENTS_SUCCESS:
            return state
            .setIn(['appointments', 'isLoading'], false)
            .setIn(['appointments', 'errors'], null)
            .setIn(['appointments', 'data'], action.data);
  
        case GET_APPOINTMENTS_FAILED:
            return state
            .setIn(['appointments', 'isLoading'], false)
            .setIn(['appointments', 'errors'], [action.error.message]);


        case INSERT_APPOINTMENTS:
            return state
            .setIn(['appointments', 'isLoading'], true)
            .setIn(['appointments', 'errors'], null);
  
        case INSERT_APPOINTMENTS_SUCCESS:
            return state
            .setIn(['appointments', 'isLoading'], false)
            .setIn(['appointments', 'errors'], null)
            .setIn(['appointments', 'insertLasted', 'data'], action.data);
  
        case INSERT_APPOINTMENTS_FAILED:
            return state
            .setIn(['appointments', 'isLoading'], false)
            .setIn(['appointments', 'errors'], [action.error.message]);
  
        default:
            return state;
    }
}