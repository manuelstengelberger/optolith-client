// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Pervasives from "bs-platform/lib/es6/pervasives.js";

function range(param) {
  var u = param[1];
  var l = param[0];
  if (l > u) {
    return /* [] */0;
  } else if (l === u) {
    return /* :: */[
            u,
            /* [] */0
          ];
  } else {
    return /* :: */[
            l,
            range(/* tuple */[
                  l + 1 | 0,
                  u
                ])
          ];
  }
}

function inRange(param, x) {
  if (param[0] <= x) {
    return x <= param[1];
  } else {
    return false;
  }
}

function index(p, x) {
  if (inRange(p, x)) {
    return x - p[0] | 0;
  }
  throw Pervasives.invalid_arg("Ix.index: Index out of range.");
}

function rangeSize(param) {
  var u = param[1];
  var l = param[0];
  if (l <= u) {
    return (u - l | 0) + 1 | 0;
  } else {
    return 0;
  }
}

export {
  range ,
  inRange ,
  index ,
  rangeSize ,
  
}
/* No side effect */
