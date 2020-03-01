// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Ix$OptolithClient = require("../../Data/Ix.bs.js");
var Int$OptolithClient = require("../../Data/Int.bs.js");

function getAPCostBaseByIC(ic) {
  switch (ic) {
    case /* A */0 :
        return 1;
    case /* B */1 :
        return 2;
    case /* C */2 :
        return 3;
    case /* D */3 :
        return 4;
    case /* E */4 :
        return 15;
    
  }
}

function getLastSRWithConstantCost(ic) {
  if (ic === /* E */4) {
    return 14;
  } else {
    return 12;
  }
}

function getBaseMultiplier(ic, sr) {
  return Int$OptolithClient.max(1, sr - getLastSRWithConstantCost(ic) | 0);
}

function getCost(ic, sr) {
  return Caml_int32.imul(getAPCostBaseByIC(ic), getBaseMultiplier(ic, sr));
}

function getAPForBounds(ic, l, u) {
  var __x = Ix$OptolithClient.range(/* tuple */[
        l + 1 | 0,
        u
      ]);
  return List.fold_right((function (sr) {
                var partial_arg = getCost(ic, sr);
                return (function (param) {
                    return partial_arg + param | 0;
                  });
              }), __x, 0);
}

function getAPForRange(ic, fromSR, toSR) {
  if (fromSR < toSR) {
    return getAPForBounds(ic, fromSR, toSR);
  } else if (fromSR > toSR) {
    return getAPForBounds(ic, toSR, fromSR);
  } else {
    return 0;
  }
}

function icToStr(ic) {
  switch (ic) {
    case /* A */0 :
        return "A";
    case /* B */1 :
        return "B";
    case /* C */2 :
        return "C";
    case /* D */3 :
        return "D";
    case /* E */4 :
        return "E";
    
  }
}

exports.getAPCostBaseByIC = getAPCostBaseByIC;
exports.getLastSRWithConstantCost = getLastSRWithConstantCost;
exports.getBaseMultiplier = getBaseMultiplier;
exports.getCost = getCost;
exports.getAPForBounds = getAPForBounds;
exports.getAPForRange = getAPForRange;
exports.icToStr = icToStr;
/* No side effect */