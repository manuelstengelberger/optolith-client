// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as List from "bs-platform/lib/es6/list.js";
import * as Caml_int32 from "bs-platform/lib/es6/caml_int32.js";
import * as Json_decode from "@glennsl/bs-json/src/Json_decode.bs.js";
import * as Ley_Ix$OptolithClient from "../../Data/Ley_Ix.bs.js";
import * as Ley_Int$OptolithClient from "../../Data/Ley_Int.bs.js";

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
  return Ley_Int$OptolithClient.max(1, (sr - getLastSRWithConstantCost(ic) | 0) + 1 | 0);
}

function getCost(ic, sr) {
  return Caml_int32.imul(getAPCostBaseByIC(ic), getBaseMultiplier(ic, sr));
}

function getAPForBounds(ic, l, u) {
  var __x = Ley_Ix$OptolithClient.range(/* tuple */[
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
    return -getAPForBounds(ic, toSR, fromSR) | 0;
  } else {
    return 0;
  }
}

function getAPForInc(ic, fromSR) {
  return getCost(ic, fromSR + 1 | 0);
}

function getAPForDec(ic, fromSR) {
  return -getCost(ic, fromSR) | 0;
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

function icToIx(ic) {
  return ic;
}

function t(json) {
  var x = Json_decode.string(json);
  switch (x) {
    case "A" :
        return /* A */0;
    case "B" :
        return /* B */1;
    case "C" :
        return /* C */2;
    case "D" :
        return /* D */3;
    case "E" :
        return /* E */4;
    default:
      throw [
            Json_decode.DecodeError,
            "Unknown improvement cost: " + x
          ];
  }
}

var Decode = {
  t: t
};

var getAPForActivatation = getAPCostBaseByIC;

export {
  getAPForRange ,
  getAPForInc ,
  getAPForDec ,
  getAPForActivatation ,
  icToStr ,
  icToIx ,
  Decode ,
  
}
/* No side effect */
