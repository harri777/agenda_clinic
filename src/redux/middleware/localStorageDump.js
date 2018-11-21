import Log from '../../helpers/Log';

export default store => next => action => {
  if (typeof window === 'undefined') {
    // server-side rendering
    Log.error('Cannot dump state on the server!');
    return next(action);
  }

  next(action);

  Log.debug('DUMP: Dumping to local store...\n----------------------------------------------------------------------------');
  const state = store.getState();
  localStorage.setItem('state', JSON.stringify(state));
};
