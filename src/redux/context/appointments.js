import urlApi from '../../config/api';
import Api from '../../helpers/api'; 
import history from '../../history';
import { push } from 'react-router-redux'
import dateFns, { getHours } from "date-fns";
// ------------------------------------
// Constants
// ------------------------------------

const GET_APPOINTMENTS = 'appointments.GET_APPOINTMENTS';
const GET_APPOINTMENTS_SUCCESS = 'appointments.GET_APPOINTMENTS_SUCCESS';
const GET_APPOINTMENTS_FAILED = 'appointments.GET_APPOINTMENTS_FAILED';

const CREATE_APPOINTMENTS = 'appointments.CREATE_APPOINTMENTS';
const CREATE_APPOINTMENTS_SUCCESS = 'appointments.CREATE_APPOINTMENTS_SUCCESS';
const CREATE_APPOINTMENTS_FAILED = 'appointments.CREATE_APPOINTMENTS_FAILED';

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
                console.log(res)
                if(res.status === 200){ 
                    addSecondsToTimerWithZero(res.data).then(
                        (result) => {
                            dispatch({
                                type: GET_APPOINTMENTS_SUCCESS,
                                data: {
                                    data: result
                                },
                            });
                        }
                    )
                } else {
                    dispatch({
                        type: GET_APPOINTMENTS_SUCCESS,
                        data: {
                            data: []
                        },
                    });
                }       
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


export const createAppointments = (data: Object) => (
    (dispatch: Dispatch) => {
        dispatch({ type: CREATE_APPOINTMENTS });
        Api.post("events", {
            data,
            header: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        } , true).then
            (res => {
                console.log(res)
                dispatch({
                    type: CREATE_APPOINTMENTS_SUCCESS,
                    data: res,
                });
            })
        .catch(error => {
            console.log(error)
            dispatch({
                type: CREATE_APPOINTMENTS_FAILED,
                error: error,
            });
            
        });
    }
);


export const updateAppointments = (data: Object) => (
    (dispatch: Dispatch) => {
        dispatch({ type: UPDATE_APPOINTMENTS });
        Api.put(`events/${data.id}`, {
            data,
            header: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        } , true).then
            (res => {
                console.log(res)
                dispatch({
                    type: UPDATE_APPOINTMENTS_SUCCESS,
                    data: res,
                });
            })
        .catch(error => {
            console.log(error)
            dispatch({
                type: UPDATE_APPOINTMENTS_FAILED,
                error: error,
            });
            
        });
    }
);

export const deleteAppointment = (id: String) => (
    (dispatch: Dispatch) => {
        dispatch({ type: DELETE_APPOINTMENTS });
        Api.destroy(`events/${id}`, {
            header: {'Accept': 'application/json', 'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'crossDomain': true,
            'Access-Control-Allow-Header': "Origin, X-Requested-With, Content-Type, Accept"}
        } , true).then
            (res => {
                console.log(res)
                dispatch({
                    type: DELETE_APPOINTMENTS_SUCCESS,
                    data: res,
                });
            })
        .catch(error => {
            console.log(error)
            dispatch({
                type: DELETE_APPOINTMENTS_FAILED,
                error: error,
            });
            
        });
    }
);


const addSecondsToTimerWithZero = (data: Object) => new Promise((resolve, reject) => {
    let result = [];
    let date = '';
    data.forEach (function (item) {
        let ISOHour = item.date.substring(10, 24);
        if(ISOHour === "T00:00:00.000Z"){
            date = dateFns.addDays(item.date, 1)
        } else {
            date = item.date
        }
        result.push({
            id: item.id,
            title: item.title,
            start_time: item.start_time,
            end_time: item.end_time,
            date,
        })
    });
    return resolve(result);
})

export const appointmentsActions = {
    getAppointments,
    createAppointments,
    updateAppointments,
    deleteAppointment
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
            .setIn(['appointments', 'data'], action.data)
            .setIn(['appointments', 'lastCreated', 'data'], [])
            .setIn(['appointments', 'lastUpdated', 'data'], [])
            .setIn(['appointments', 'delete', 'data'], []);
  
        case GET_APPOINTMENTS_FAILED:
            return state
            .setIn(['appointments', 'isLoading'], false)
            .setIn(['appointments', 'errors'], [action.error.message]);


        case CREATE_APPOINTMENTS:
            return state
            .setIn(['appointments', 'isLoading'], true)
            .setIn(['appointments', 'errors'], null);
  
        case CREATE_APPOINTMENTS_SUCCESS:
            return state
            .setIn(['appointments', 'isLoading'], false)
            .setIn(['appointments', 'errors'], null)
            .setIn(['appointments', 'lastCreated', 'data'], action.data);
  
        case CREATE_APPOINTMENTS_FAILED:
            return state
            .setIn(['appointments', 'isLoading'], false)
            .setIn(['appointments', 'errors'], [action.error.message]);

        case UPDATE_APPOINTMENTS:
            return state
            .setIn(['appointments', 'isLoading'], true)
            .setIn(['appointments', 'errors'], null);
  
        case UPDATE_APPOINTMENTS_SUCCESS:
            return state
            .setIn(['appointments', 'isLoading'], false)
            .setIn(['appointments', 'errors'], null)
            .setIn(['appointments', 'lastUpdated', 'data'], action.data);
  
        case UPDATE_APPOINTMENTS_FAILED:
            return state
            .setIn(['appointments', 'isLoading'], false)
            .setIn(['appointments', 'errors'], [action.error.message]);

        case DELETE_APPOINTMENTS:
            return state
            .setIn(['appointments', 'isLoading'], true)
            .setIn(['appointments', 'errors'], null);
  
        case DELETE_APPOINTMENTS_SUCCESS:
            return state
            .setIn(['appointments', 'isLoading'], false)
            .setIn(['appointments', 'errors'], null)
            .setIn(['appointments', 'delete', 'data'], action.data);
  
        case DELETE_APPOINTMENTS_FAILED:
            return state
            .setIn(['appointments', 'isLoading'], false)
            .setIn(['appointments', 'errors'], [action.error.message]);
  
        default:
            return state;
    }
}