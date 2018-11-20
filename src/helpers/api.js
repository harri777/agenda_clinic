import jQuery from 'jquery';
import axios from 'axios';
import moment from 'moment';
import { get as _get } from 'lodash';
import Log from './Log';
import urlApi from '../config/api';
import { stringifyData, stringifyError } from './helpers';

function makeUrl(path) {
  return path;
}

export function getSync(path, params = {}) {
  Log.debug('API: SYNC GET from ' + path);
  return true;
  jQuery.ajax({
    async: false,
    type: 'GET',
    url: path,
    dataType: 'json',
    cache: false,
    success: (response) => {
      // success callback
      if (params.success) {
        params.success(response.data);
      }
    },
    error: (xhr, status, err) => {
      Log.error('Something went wrong with the GET call to ' + path + ' : ' + status + ' / ' + err);

      // error callback?
      if (params.error) {
        params.error(xhr, status, err);
      }
    },
  });
}

export function get(path, params = {}) {
  Log.debug('API: GET from', path, 'params:', stringifyData(params.query || ''));
  return axios.get(urlApi.value + path, {
    data: params.data || {}, // hack to keep Content-Type header in request: https://github.com/mzabriskie/axios/issues/86#issuecomment-139638284
    params: params.query,
    headers: params.header,
  })
    .then((response) => {
      // success callback
      if (params.success) {
        params.success(response.data);
      }
      return response;
    })
    .catch((error) => {
      Log.error('Something went wrong with the GET call to ' + path + ' :' + stringifyError(error));
      // error callback
      if (params.error) {
        params.error(error);
      }
      // reject promise to trigger callAPI error function which calls error dispatch type
      return Promise.reject(error);
    });
}

export function post(path, params = {}) {
	Log.debug('API: POST to '  + path + ' query: ' + stringifyData(params.query || '') + ' data: ' + stringifyData(params.data || ''));
	return axios.post(urlApi.value + path, params.data, {
			headers: params.header,
	})
	.then(response => {
		if (params.success) {
			params.success(response);
		}
			return response;
	})
	.catch(error => {
		Log.error('Something went wrong with the POST call to ' + path + ' :' + stringifyError(error));
      // error callback
      if (params.error) {
        params.error(error);
      }
      // reject promise to trigger callAPI error function which calls error dispatch type
      return Promise.reject(error);
	});
}

export function put(path, params = {}) {
  Log.debug('API: PUT to ' + path + ' query: ' + stringifyData(params.query || '') + ' data: ' + stringifyData(params.data || ''));
  return axios.put(urlApi.value + path, params.data, {
    params: params.query,
  })
    .then((response) => {
      // success callback
      if (params.success) {
        params.success(response.data);
      }
      return response;
    })
    .catch((error) => {
      Log.error('Something went wrong with the PUT call to ' + path + ' :' + stringifyError(error));
      // error callback
      if (params.error) {
        params.error(error);
      }
      // reject promise to trigger callAPI error function which calls error dispatch type
      return Promise.reject(error);
    });
}

// method is named 'destroy' on purpose since it is not possible to use 'delete'
export function destroy(path, params = {}) {
  Log.debug('API: delete to ' + path + ' query: ' + stringifyData(params.query || '') + ' data: ' + stringifyData(params.data || ''));
  return axios.delete(urlApi.value + path, {
    data: params.data || {}, // hack to keep Content-Type header in request: https://github.com/mzabriskie/axios/issues/86#issuecomment-139638284
    params: params.query,
  })
    .then((response) => {
      // success callback
      if (params.success) {
        params.success(response.data);
      }
      return response;
    })
    .catch((error) => {
      Log.error('Something went wrong with the DELETE call to ' + path + ' :' + stringifyError(error));
      // error callback
      if (params.error) {
        params.error(error);
      }
      // reject promise to trigger callAPI error function which calls error dispatch type
      return Promise.reject(error);
    });
}

export function patch(path, params = {}) {
  Log.debug('API: PATCH to ' + path + ' query: ' + stringifyData(params.query || '') + ' data: ' + stringifyData(params.data || ''));
  return axios.patch(urlApi.value + path, params.data, {
    params: params.query,
  })
    .then((response) => {
      // console.log(response)
      // success callback
      if (params.success) {
        params.success(response.data);
      }
      return response;
    })
    .catch((error) => {
      Log.error('Something went wrong with the PATCH call to ' + path + ' :' + stringifyError(error));
      // error callback
      if (params.error) {
        params.error(error);
      }
      // reject promise to trigger callAPI error function which calls error dispatch type
      return Promise.reject(error);
    });
}

export default {
  get,
  getSync,
  post,
  destroy,
  put,
  patch,
};
