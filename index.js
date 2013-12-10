"use strict";

// ---

function mixIn(target, source){
  Object.keys(source).forEach(function(key){
    target[key] = source[key];
  });
  return target;
}


// ---


exports.eachInBetween = eachInBetween;
function eachInBetween(startToken, endToken, iterator) {
  while (startToken && startToken !== endToken.next) {
    iterator(startToken);
    startToken = startToken.next;
  }
}


// ---

// XXX: ugly but works for now, that way we avoid changing the whole
// esformatter structure.
mixIn(exports, require('./find'));
mixIn(exports, require('./insert'));
mixIn(exports, require('./is'));
mixIn(exports, require('./remove'));

