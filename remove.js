"use strict";

var makeArrayCheck = require('./makeArrayCheck');
var isEmpty = require('./is').isEmpty;


// ---


exports.remove = remove;
function remove(target) {
  if (target.next) {
    target.next.prev = target.prev;
  } else if (target.root) {
    target.root.endToken = target.prev;
  }

  if (target.prev) {
    target.prev.next = target.next;
  } else if (target.root) {
    target.root.startToken = target.next;
  }
}


exports.removeInBetween = removeInBetween;
function removeInBetween(startToken, endToken, check) {
  if (Array.isArray(check)) {
    check = makeArrayCheck(check);
  }
  while (startToken && startToken !== endToken.next) {
    if (typeof check === 'function') {
      if (check(startToken)) {
        remove(startToken);
      }
    } else if (startToken.type === check || startToken.value === check) {
      remove(startToken);
    }
    startToken = startToken.next;
  }
}


exports.removeAdjacent = removeAdjacent;
function removeAdjacent(token, check) {
  removeAdjacentBefore(token, check);
  removeAdjacentAfter(token, check);
}


exports.removeAdjacentBefore = removeAdjacentBefore;
function removeAdjacentBefore(token, check) {
  if (Array.isArray(check)) {
    check = makeArrayCheck(check);
  }
  var prev = token.prev;
  if (typeof check === 'function') {
    while (prev && check(prev)) {
      remove(prev);
      prev = prev.prev;
    }
  } else {
    while (prev && (prev.type === check || prev.value === check)) {
      remove(prev);
      prev = prev.prev;
    }
  }
}


exports.removeAdjacentAfter = removeAdjacentAfter;
function removeAdjacentAfter(token, check) {
  if (Array.isArray(check)) {
    check = makeArrayCheck(check);
  }
  var next = token.next;
  if (typeof check === 'function') {
    while (next && check(next)) {
      remove(next);
      next = next.next;
    }
  } else {
    while (next && (next.type === check || next.value === check)) {
      remove(next);
      next = next.next;
    }
  }
}


exports.removeEmptyAdjacentBefore = removeEmptyAdjacentBefore;
function removeEmptyAdjacentBefore(startToken) {
  removeAdjacentBefore(startToken, isEmpty);
}


exports.removeEmptyInBetween = removeEmptyInBetween;
function removeEmptyInBetween(startToken, endToken) {
  removeInBetween(startToken, endToken, isEmpty);
}

