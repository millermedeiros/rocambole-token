"use strict";

var makeArrayCheck = require('./makeArrayCheck');
var isNotEmpty = require('./is').isNotEmpty;


// ---


exports.findInBetween = findInBetween;
function findInBetween(startToken, endToken, check) {
  if (Array.isArray(check)) {
    check = makeArrayCheck(check);
  }
  var found;
  while (startToken && startToken !== endToken.next && !found) {
    if (typeof check === 'function') {
      if (check(startToken)) {
        found = startToken;
      }
    } else if (startToken.type === check || startToken.value === check) {
      found = startToken;
    }
    startToken = startToken.next;
  }
  return found;
}


exports.findInBetweenFromEnd = findInBetweenFromEnd;
function findInBetweenFromEnd(startToken, endToken, check) {
  var found;
  while (endToken && endToken !== startToken.prev && !found) {
    if (typeof check === 'function') {
      if (check(endToken)) {
        found = endToken;
      }
    } else if (endToken.type === check || endToken.value === check) {
      found = endToken;
    }
    endToken = endToken.prev;
  }
  return found;
}


exports.findNext = findNext;
function findNext(startToken, check) {
  if (Array.isArray(check)) {
    check = makeArrayCheck(check);
  }
  startToken = startToken ? startToken.next : null;
  while (startToken) {
    if (typeof check === 'function') {
      if (check(startToken)) {
        return startToken;
      }
    } else if (startToken.type === check || startToken.value === check) {
      return startToken;
    }
    startToken = startToken.next;
  }
}


exports.findPrev = findPrev;
function findPrev(endToken, check) {
  if (Array.isArray(check)) {
    check = makeArrayCheck(check);
  }
  endToken = endToken ? endToken.prev : null;
  while (endToken) {
    if (typeof check === 'function') {
      if (check(endToken)) {
        return endToken;
      }
    } else if (endToken.type === check || endToken.value === check) {
      return endToken;
    }
    endToken = endToken.prev;
  }
}


exports.findNextNonEmpty = findNextNonEmpty;
function findNextNonEmpty(startToken) {
  return findNext(startToken, isNotEmpty);
}


exports.findPrevNonEmpty = findPrevNonEmpty;
function findPrevNonEmpty(endToken) {
  return findPrev(endToken, isNotEmpty);
}

