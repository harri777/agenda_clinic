/* eslint-disable no-console */

function prefix (level) {
    return `[${level}]`;
  }
  
  function info () {
    console.log(prefix('INFO'), ...arguments);
  }
  
  function debug () {
    console.log(prefix('DEBUG'), ...arguments);
  }
  
  function debugObject () {
    console.log(prefix('DEBUG'), arguments);
  }
  
  function warn () {
    console.warn(prefix('WARN'), ...arguments);
  }
  
  function error () {
    console.error(prefix('ERROR'), ...arguments);
  }
  
  export default {
    info,
    debug,
    debugObject,
    warn,
    error,
  };
  