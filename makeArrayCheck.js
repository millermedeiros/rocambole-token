"use strict";

module.exports = makeArrayCheck;

function makeArrayCheck(arr) {
  return function(node) {
    return node && arr.indexOf(node.type) !== -1;
  };
}

