import urlApi from '../../config/api';
import Api from '../../helpers/api'; 
import history from '../../history';
import { push } from 'react-router-redux'
// ------------------------------------
// Constants
// ------------------------------------

const MAIN = 'main.MAIN';
const MAIN_SUCCESS = 'main.MAIN_SUCCESS';
const MAIN_FAILED = 'main.MAIN_FAILED';

// ------------------------------------
// Actions
// -----------------------------------

export const testRedux = (data: Object) => (
    (dispatch: Dispatch) => {
        dispatch({ type: MAIN });
        console.log(data);
        dispatch({
            type: MAIN_SUCCESS,
            data,
        });

        /* EXEMPLO CHAMADA API COM AXIOS */
        /*
            Api.post("EasyClinicUsers/login", {
                data,
                header: {'Accept': 'application/json', 'Content-Type': 'application/json'}
            } , true).then
                (res => {
                    if(res.status === 200){
                        localStorage.setItem('userId', res.data.id)
                        getData(res.data).then(
                            (result) => {
                                console.log(result)
                                dispatch({
                                    type: MAIN_SUCCESS,
                                    data: result.data.response[0],
                                });
                                dispatch(push('/home'));
                            }
                        )
                    }
                    console.log(res)
                })
            .catch(error => {
                alert("Usuário e/ou senha inválidos.")
                console.log(error)
                dispatch({
                    type: MAIN_FAILED,
                    error: error,
                });
                
            });
        */
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

export const mainActions = {
    testRedux,
};

export default function mainReducer (state, action): ContextState {
    switch (action.type) {
        case MAIN:
            return state
            .setIn(['main', 'isLoading'], true)
            .setIn(['main', 'errors'], null);
  
        case MAIN_SUCCESS:
            return state
            .setIn(['main', 'isLoading'], false)
            .setIn(['main', 'errors'], null)
            .setIn(['main', 'data'], action.data);
  
        case MAIN_FAILED:
            return state
            .setIn(['main', 'isLoading'], false)
            .setIn(['main', 'errors'], [action.error.message]);
  
        default:
            return state;
    }
}