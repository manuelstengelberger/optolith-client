// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE


function toOrdering(n) {
  if (n < 0) {
    return /* LT */0;
  } else if (n > 0) {
    return /* GT */2;
  } else {
    return /* EQ */1;
  }
}

function fromOrdering(ord) {
  return ord - 1 | 0;
}

export {
  toOrdering ,
  fromOrdering ,
  
}
/* No side effect */
