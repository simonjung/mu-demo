'use strict';

/**
 * Composes functions from left-to-right
 * @return {Function} a composed function
 */
exports.flow = function () {
  const args = [].slice.call(arguments);

  return function(comp) {
    return args.reduce(function(last, fn) {
      return fn.call(this, last);
    }, comp);
  }
};

/**
 * Debounce a function
 * http://davidwalsh.name/javascript-debounce-function
 * 
 * @param  {Function} func        is the delayed function
 * @param  {Number}   wait        is time in milliseconds
 * @param  {bool}     immediate   call before instead of after
 * @return {Function}             a wrapped debounced function
 *
 */
exports.debounce = function(func, wait, immediate) {
  var timeout;

  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
