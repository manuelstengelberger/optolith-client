// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Ley_List$OptolithClient from "../Data/Ley_List.bs.js";

function heroEntryToSingles(x) {
  return Ley_List$OptolithClient.map((function (s) {
                return {
                        id: x.id,
                        options: s.options,
                        level: s.level,
                        customCost: s.customCost
                      };
              }), x.active);
}

function singleToSingleWithId(x, s) {
  return {
          id: x.id,
          options: s.options,
          level: s.level,
          customCost: s.customCost
        };
}

function activatableOptionToSelectOptionId(id) {
  if (id.HASH >= 931971705) {
    return ;
  } else {
    return id;
  }
}

export {
  heroEntryToSingles ,
  singleToSingleWithId ,
  activatableOptionToSelectOptionId ,
  
}
/* No side effect */