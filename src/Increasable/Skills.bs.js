// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Js_math from "bs-platform/lib/es6/js_math.js";
import * as Id$OptolithClient from "../Misc/Id.bs.js";
import * as Ley_Int$OptolithClient from "../Data/Ley_Int.bs.js";
import * as Ley_List$OptolithClient from "../Data/Ley_List.bs.js";
import * as Attributes$OptolithClient from "./Attributes.bs.js";
import * as Ley_IntMap$OptolithClient from "../Data/Ley_IntMap.bs.js";
import * as Ley_Option$OptolithClient from "../Data/Ley_Option.bs.js";
import * as Dependencies$OptolithClient from "../Prerequisites/Dependencies.bs.js";
import * as Activatable_Accessors$OptolithClient from "../Activatable/Activatable_Accessors.bs.js";

function getValueDef(param) {
  return Ley_Option$OptolithClient.option(8, (function (x) {
                return x.value;
              }), param);
}

function getExceptionalSkillBonus(exceptionalSkill, id) {
  return Ley_Option$OptolithClient.option(0, (function (x) {
                return Ley_List$OptolithClient.countBy((function (a) {
                              return Ley_Option$OptolithClient.Foldable.elem(id, Ley_Option$OptolithClient.listToOption(a.options));
                            }), x.active);
              }), exceptionalSkill);
}

function getMaxSrByCheckAttrs(mp, check) {
  var param = Attributes$OptolithClient.getSkillCheckValues(mp, check);
  return Ley_List$OptolithClient.Foldable.maximum({
              hd: param[0],
              tl: {
                hd: param[1],
                tl: {
                  hd: param[2],
                  tl: /* [] */0
                }
              }
            }) + 2 | 0;
}

function getMaxSrFromEl(startEl, phase) {
  if (phase >= 2) {
    return ;
  } else {
    return startEl.maxSkillRating;
  }
}

function getMax(startEl, phase, heroAttrs, exceptionalSkill, staticEntry) {
  return getExceptionalSkillBonus(exceptionalSkill, {
              HASH: /* Skill */290194801,
              VAL: staticEntry.id
            }) + Ley_List$OptolithClient.Foldable.minimum(Ley_Option$OptolithClient.catOptions({
                  hd: getMaxSrByCheckAttrs(heroAttrs, staticEntry.check),
                  tl: {
                    hd: getMaxSrFromEl(startEl, phase),
                    tl: /* [] */0
                  }
                })) | 0;
}

function isIncreasable(startEl, phase, heroAttrs, exceptionalSkill, staticEntry, heroEntry) {
  return heroEntry.value < getMax(startEl, phase, heroAttrs, exceptionalSkill, staticEntry);
}

function getMinSrByCraftInstruments(craftInstruments, skills, staticEntry) {
  var match = Id$OptolithClient.unsafeSkillFromInt(staticEntry.id);
  if (match !== 50 && match !== 54) {
    return ;
  }
  if (!Activatable_Accessors$OptolithClient.isActiveM(craftInstruments)) {
    return ;
  }
  var otherSkillId;
  if (match !== 50) {
    if (match !== 54) {
      throw {
            RE_EXN_ID: "Match_failure",
            _1: [
              "Skills.re",
              87,
              10
            ],
            Error: new Error()
          };
    }
    otherSkillId = /* Woodworking */50;
  } else {
    otherSkillId = /* Metalworking */54;
  }
  var otherSkillRating = getValueDef(Curry._2(Ley_IntMap$OptolithClient.lookup, Id$OptolithClient.skillToInt(otherSkillId), skills));
  return 12 - otherSkillRating | 0;
}

function getMinSrByDeps(heroSkills, heroEntry) {
  return Ley_Option$OptolithClient.Functor.$less$amp$great(Ley_Option$OptolithClient.ensure(Ley_List$OptolithClient.Extra.notNull, Dependencies$OptolithClient.Flatten.flattenSkillDependencies((function (id) {
                        return getValueDef(Curry._2(Ley_IntMap$OptolithClient.lookup, id, heroSkills));
                      }), heroEntry.id, heroEntry.dependencies)), Ley_List$OptolithClient.Foldable.maximum);
}

function getMin(craftInstruments, heroSkills, staticEntry, heroEntry) {
  return Ley_Option$OptolithClient.Functor.$less$amp$great(Ley_Option$OptolithClient.ensure(Ley_List$OptolithClient.Extra.notNull, Ley_Option$OptolithClient.catOptions({
                      hd: getMinSrByDeps(heroSkills, heroEntry),
                      tl: {
                        hd: getMinSrByCraftInstruments(craftInstruments, heroSkills, staticEntry),
                        tl: /* [] */0
                      }
                    })), Ley_List$OptolithClient.Foldable.maximum);
}

function isDecreasable(craftInstruments, heroSkills, staticEntry, heroEntry) {
  return heroEntry.value > Ley_Option$OptolithClient.fromOption(0, getMin(craftInstruments, heroSkills, staticEntry, heroEntry));
}

function getMissingPoints(param) {
  return Ley_List$OptolithClient.Foldable.sum(Ley_List$OptolithClient.map((function (a) {
                    return Ley_Int$OptolithClient.max(0, 13 - a | 0);
                  }), {
                  hd: param[0],
                  tl: {
                    hd: param[1],
                    tl: {
                      hd: param[2],
                      tl: /* [] */0
                    }
                  }
                }));
}

function getBaseMinCheckMod(sr) {
  return (-Js_math.floor_int((sr - 1.0) / 3.0) | 0) + 3 | 0;
}

function getMinCheckModForRoutine(check, sr) {
  return Ley_Option$OptolithClient.Monad.$great$great$eq(Ley_Option$OptolithClient.ensure((function (param) {
                    return 0 > param;
                  }), sr), (function (sr) {
                var missingPoints = getMissingPoints(check);
                var checkModThreshold = getBaseMinCheckMod(sr);
                var dependentCheckMod = checkModThreshold + missingPoints | 0;
                if (dependentCheckMod < 4) {
                  return [
                          dependentCheckMod,
                          missingPoints > 0
                        ];
                }
                
              }));
}

var Routine = {
  getMinCheckModForRoutine: getMinCheckModForRoutine
};

export {
  getValueDef ,
  getExceptionalSkillBonus ,
  getMaxSrByCheckAttrs ,
  getMaxSrFromEl ,
  getMax ,
  isIncreasable ,
  getMin ,
  isDecreasable ,
  Routine ,
  
}
/* Attributes-OptolithClient Not a pure module */
