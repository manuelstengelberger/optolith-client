// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Js_math = require("bs-platform/lib/js/js_math.js");
var Id$OptolithClient = require("../Constants/Id.bs.js");
var Int$OptolithClient = require("../../Data/Int.bs.js");
var ListH$OptolithClient = require("../../Data/ListH.bs.js");
var Maybe$OptolithClient = require("../../Data/Maybe.bs.js");
var IntMap$OptolithClient = require("../../Data/IntMap.bs.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");
var Activatable$OptolithClient = require("./Activatable.bs.js");
var Dependencies$OptolithClient = require("./Dependencies.bs.js");

function getValueDef(param) {
  return Maybe$OptolithClient.maybe(8, (function (x) {
                return x.value;
              }), param);
}

function getSkillCheckValues(mp, param) {
  return /* tuple */[
          getValueDef(Curry._2(IntMap$OptolithClient.lookup, param[0], mp)),
          getValueDef(Curry._2(IntMap$OptolithClient.lookup, param[1], mp)),
          getValueDef(Curry._2(IntMap$OptolithClient.lookup, param[2], mp))
        ];
}

var Attributes = {
  getValueDef: getValueDef,
  getSkillCheckValues: getSkillCheckValues
};

function getValueDef$1(param) {
  return Maybe$OptolithClient.maybe(8, (function (x) {
                return x.value;
              }), param);
}

function getExceptionalSkillBonus(exceptionalSkill, id) {
  return Maybe$OptolithClient.maybe(0, (function (x) {
                return ListH$OptolithClient.countBy((function (a) {
                              return Maybe$OptolithClient.Foldable.elem(id, Maybe$OptolithClient.listToMaybe(a.options));
                            }), x.active);
              }), exceptionalSkill);
}

function getMaxSrByCheckAttrs(mp, check) {
  var param = getSkillCheckValues(mp, check);
  return ListH$OptolithClient.Foldable.maximum(/* :: */[
              param[0],
              /* :: */[
                param[1],
                /* :: */[
                  param[2],
                  /* [] */0
                ]
              ]
            ]) + 2 | 0;
}

function getMaxSrFromEl(startEl, phase) {
  if (phase >= 2) {
    return /* Nothing */0;
  } else {
    return /* Just */[startEl.maxSkillRating];
  }
}

function getMax(startEl, phase, heroAttrs, exceptionalSkill, staticEntry) {
  return getExceptionalSkillBonus(exceptionalSkill, /* `Skill */[
              290194801,
              staticEntry.id
            ]) + ListH$OptolithClient.Foldable.minimum(Maybe$OptolithClient.catMaybes(/* :: */[
                  /* Just */[getMaxSrByCheckAttrs(heroAttrs, staticEntry.check)],
                  /* :: */[
                    getMaxSrFromEl(startEl, phase),
                    /* [] */0
                  ]
                ])) | 0;
}

function isIncreasable(startEl, phase, heroAttrs, exceptionalSkill, staticEntry, heroEntry) {
  return heroEntry.value < getMax(startEl, phase, heroAttrs, exceptionalSkill, staticEntry);
}

function getMinSrByCraftInstruments(craftInstruments, skills, staticEntry) {
  var match = Id$OptolithClient.unsafeSkillFromInt(staticEntry.id);
  if (match !== 50 && match !== 54) {
    return /* Nothing */0;
  }
  if (!Activatable$OptolithClient.isActiveM(craftInstruments)) {
    return /* Nothing */0;
  }
  var otherSkillId;
  if (match !== 50) {
    if (match !== 54) {
      throw [
            Caml_builtin_exceptions.match_failure,
            /* tuple */[
              "Increasable.re",
              115,
              12
            ]
          ];
    }
    otherSkillId = /* Woodworking */50;
  } else {
    otherSkillId = /* Metalworking */54;
  }
  var otherSkillRating = getValueDef$1(Curry._2(IntMap$OptolithClient.lookup, Id$OptolithClient.skillToInt(otherSkillId), skills));
  return /* Just */[12 - otherSkillRating | 0];
}

function getMinSrByDeps(heroSkills, heroEntry) {
  return Maybe$OptolithClient.Functor.$less$amp$great(Maybe$OptolithClient.ensure(ListH$OptolithClient.Extra.notNull, Dependencies$OptolithClient.flattenSkill((function (id) {
                        return getValueDef$1(Curry._2(IntMap$OptolithClient.lookup, id, heroSkills));
                      }), heroEntry.id, heroEntry.dependencies)), ListH$OptolithClient.Foldable.maximum);
}

function getMin(craftInstruments, heroSkills, staticEntry, heroEntry) {
  return Maybe$OptolithClient.Functor.$less$amp$great(Maybe$OptolithClient.ensure(ListH$OptolithClient.Extra.notNull, Maybe$OptolithClient.catMaybes(/* :: */[
                      getMinSrByDeps(heroSkills, heroEntry),
                      /* :: */[
                        getMinSrByCraftInstruments(craftInstruments, heroSkills, staticEntry),
                        /* [] */0
                      ]
                    ])), ListH$OptolithClient.Foldable.maximum);
}

function isDecreasable(craftInstruments, heroSkills, staticEntry, heroEntry) {
  return heroEntry.value > Maybe$OptolithClient.fromMaybe(0, getMin(craftInstruments, heroSkills, staticEntry, heroEntry));
}

function getMissingPoints(param) {
  return ListH$OptolithClient.Foldable.sum(ListH$OptolithClient.map((function (a) {
                    return Int$OptolithClient.max(0, 13 - a | 0);
                  }), /* :: */[
                  param[0],
                  /* :: */[
                    param[1],
                    /* :: */[
                      param[2],
                      /* [] */0
                    ]
                  ]
                ]));
}

function getBaseMinCheckMod(sr) {
  return (-Js_math.floor_int((sr - 1.0) / 3.0) | 0) + 3 | 0;
}

function getMinCheckModForRoutine(check, sr) {
  return Maybe$OptolithClient.Monad.$great$great$eq(Maybe$OptolithClient.ensure((function (param) {
                    return 0 > param;
                  }), sr), (function (sr) {
                var missingPoints = getMissingPoints(check);
                var checkModThreshold = getBaseMinCheckMod(sr);
                var dependentCheckMod = checkModThreshold + missingPoints | 0;
                if (dependentCheckMod < 4) {
                  return /* Just */[/* tuple */[
                            dependentCheckMod,
                            missingPoints > 0
                          ]];
                } else {
                  return /* Nothing */0;
                }
              }));
}

var Routine = {
  attributeThreshold: 13,
  getMissingPoints: getMissingPoints,
  getBaseMinCheckMod: getBaseMinCheckMod,
  getMinCheckModForRoutine: getMinCheckModForRoutine
};

var Skills = {
  getValueDef: getValueDef$1,
  getExceptionalSkillBonus: getExceptionalSkillBonus,
  getMaxSrByCheckAttrs: getMaxSrByCheckAttrs,
  getMaxSrFromEl: getMaxSrFromEl,
  getMax: getMax,
  isIncreasable: isIncreasable,
  getMinSrByCraftInstruments: getMinSrByCraftInstruments,
  getMinSrByDeps: getMinSrByDeps,
  getMin: getMin,
  isDecreasable: isDecreasable,
  Routine: Routine
};

function getMaxPrimaryAttributeValueById(heroAttrs, ps) {
  return ListH$OptolithClient.Foldable.maximum(ListH$OptolithClient.$less$plus$great(0, ListH$OptolithClient.map((function (p) {
                        return getValueDef(Curry._2(IntMap$OptolithClient.lookup, p, heroAttrs));
                      }), ps)));
}

function attributeValueToMod(value) {
  return Int$OptolithClient.max(0, (value - 8 | 0) / 3 | 0);
}

function getPrimaryAttributeMod(heroAttrs, ps) {
  return attributeValueToMod(getMaxPrimaryAttributeValueById(heroAttrs, ps));
}

function getValueDef$2(param) {
  return Maybe$OptolithClient.maybe(6, (function (x) {
                return x.value;
              }), param);
}

function getAttack(heroAttrs, staticEntry, heroEntry) {
  var ps = staticEntry.gr === 1 ? /* :: */[
      Id$OptolithClient.attributeToInt(/* Courage */0),
      /* [] */0
    ] : staticEntry.primary;
  return attributeValueToMod(getMaxPrimaryAttributeValueById(heroAttrs, ps)) + getValueDef$2(heroEntry) | 0;
}

function getParry(heroAttrs, staticEntry, heroEntry) {
  if (staticEntry.gr === Id$OptolithClient.combatTechniqueGroupToInt(/* Melee */0) && staticEntry.id !== Id$OptolithClient.combatTechniqueToInt(/* ChainWeapons */5) && staticEntry.id !== Id$OptolithClient.combatTechniqueToInt(/* Brawling */7)) {
    return /* Just */[attributeValueToMod(getMaxPrimaryAttributeValueById(heroAttrs, staticEntry.primary)) + Js_math.floor(Math.round(2.0 / getValueDef$2(heroEntry))) | 0];
  } else {
    return /* Nothing */0;
  }
}

function getExceptionalCombatTechniqueBonus(exceptionalCombatTechnique, id) {
  return Maybe$OptolithClient.maybe(0, (function (x) {
                return Maybe$OptolithClient.fromMaybe(0, Maybe$OptolithClient.Functor.$less$amp$great(Maybe$OptolithClient.listToMaybe(x.active), (function (a) {
                                  var hasBonus = Maybe$OptolithClient.Foldable.elem(/* `CombatTechnique */[
                                        -920806756,
                                        id
                                      ], Maybe$OptolithClient.listToMaybe(a.options));
                                  if (hasBonus) {
                                    return 1;
                                  } else {
                                    return 0;
                                  }
                                })));
              }), exceptionalCombatTechnique);
}

function getMaxCtrFromEl(el, phase) {
  if (phase >= 2) {
    return /* Nothing */0;
  } else {
    return /* Just */[el.maxCombatTechniqueRating];
  }
}

function getMax$1(startEl, phase, heroAttrs, exceptionalCombatTechnique, staticEntry) {
  return getExceptionalCombatTechniqueBonus(exceptionalCombatTechnique, staticEntry.id) + ListH$OptolithClient.Foldable.minimum(Maybe$OptolithClient.catMaybes(/* :: */[
                  /* Just */[getMaxPrimaryAttributeValueById(heroAttrs, staticEntry.primary)],
                  /* :: */[
                    getMaxCtrFromEl(startEl, phase),
                    /* [] */0
                  ]
                ])) | 0;
}

function isIncreasable$1(startEl, phase, heroAttrs, exceptionalCombatTechnique, staticEntry, heroEntry) {
  return heroEntry.value < getMax$1(startEl, phase, heroAttrs, exceptionalCombatTechnique, staticEntry);
}

function getMinCtrByHunter(onlyOneCombatTechniqueForHunter, staticEntry) {
  if (onlyOneCombatTechniqueForHunter && staticEntry.gr === Id$OptolithClient.combatTechniqueGroupToInt(/* Ranged */1)) {
    return /* Just */[10];
  } else {
    return /* Nothing */0;
  }
}

function getMinCtrByDeps(heroCombatTechniques, heroEntry) {
  return Maybe$OptolithClient.Functor.$less$amp$great(Maybe$OptolithClient.ensure(ListH$OptolithClient.Extra.notNull, Dependencies$OptolithClient.flattenSkill((function (id) {
                        return getValueDef$2(Curry._2(IntMap$OptolithClient.lookup, id, heroCombatTechniques));
                      }), heroEntry.id, heroEntry.dependencies)), ListH$OptolithClient.Foldable.maximum);
}

function getMin$1(onlyOneCombatTechniqueForHunter, heroCombatTechniques, staticEntry, heroEntry) {
  return Maybe$OptolithClient.Functor.$less$amp$great(Maybe$OptolithClient.ensure(ListH$OptolithClient.Extra.notNull, Maybe$OptolithClient.catMaybes(/* :: */[
                      getMinCtrByDeps(heroCombatTechniques, heroEntry),
                      /* :: */[
                        getMinCtrByHunter(onlyOneCombatTechniqueForHunter, staticEntry),
                        /* [] */0
                      ]
                    ])), ListH$OptolithClient.Foldable.maximum);
}

function isDecreasable$1(onlyOneCombatTechniqueForHunter, heroCombatTechniques, staticEntry, heroEntry) {
  return heroEntry.value > Maybe$OptolithClient.fromMaybe(6, getMin$1(onlyOneCombatTechniqueForHunter, heroCombatTechniques, staticEntry, heroEntry));
}

var CombatTechniques = {
  getMaxPrimaryAttributeValueById: getMaxPrimaryAttributeValueById,
  attributeValueToMod: attributeValueToMod,
  getPrimaryAttributeMod: getPrimaryAttributeMod,
  getValueDef: getValueDef$2,
  getAttack: getAttack,
  getParry: getParry,
  getExceptionalCombatTechniqueBonus: getExceptionalCombatTechniqueBonus,
  getMaxCtrFromEl: getMaxCtrFromEl,
  getMax: getMax$1,
  isIncreasable: isIncreasable$1,
  getMinCtrByHunter: getMinCtrByHunter,
  getMinCtrByDeps: getMinCtrByDeps,
  getMin: getMin$1,
  isDecreasable: isDecreasable$1
};

function getValueDef$3(param) {
  return Maybe$OptolithClient.maybe(/* Inactive */0, (function (x) {
                return x.value;
              }), param);
}

function flattenValue(value) {
  if (value) {
    return value[0];
  } else {
    return 0;
  }
}

function isActive(param) {
  return Maybe$OptolithClient.maybe(false, (function (x) {
                var match = x.value;
                if (match) {
                  return true;
                } else {
                  return false;
                }
              }), param);
}

function getMaxSrFromPropertyKnowledge(propertyKnowledge, staticEntry) {
  var partial_arg_001 = staticEntry.property;
  var partial_arg = /* `Generic */[
    61643255,
    partial_arg_001
  ];
  var hasRestriction = Maybe$OptolithClient.maybe(true, (function (param) {
          return ListH$OptolithClient.Foldable.notElem(partial_arg, param);
        }), Maybe$OptolithClient.Functor.$less$amp$great(propertyKnowledge, Activatable$OptolithClient.SelectOptions.getActiveSelections));
  if (hasRestriction) {
    return /* Just */[14];
  } else {
    return /* Nothing */0;
  }
}

function getMax$2(startEl, phase, heroAttrs, exceptionalSkill, propertyKnowledge, staticEntry) {
  return getExceptionalSkillBonus(exceptionalSkill, /* `Spell */[
              345443720,
              staticEntry.id
            ]) + ListH$OptolithClient.Foldable.minimum(Maybe$OptolithClient.catMaybes(/* :: */[
                  /* Just */[getMaxSrByCheckAttrs(heroAttrs, staticEntry.check)],
                  /* :: */[
                    getMaxSrFromEl(startEl, phase),
                    /* :: */[
                      getMaxSrFromPropertyKnowledge(propertyKnowledge, staticEntry),
                      /* [] */0
                    ]
                  ]
                ])) | 0;
}

function isIncreasable$2(startEl, phase, heroAttrs, exceptionalSkill, propertyKnowledge, staticEntry, heroEntry) {
  return flattenValue(heroEntry.value) < getMax$2(startEl, phase, heroAttrs, exceptionalSkill, propertyKnowledge, staticEntry);
}

function getValidSpellsForPropertyKnowledgeCounter(staticSpells, heroSpells) {
  return Curry._2(IntMap$OptolithClient.countByM, (function (x) {
                var value = x.value;
                if (value) {
                  return Maybe$OptolithClient.Functor.$less$amp$great(Maybe$OptolithClient.Monad.$great$great$eq(Maybe$OptolithClient.ensure((function (param) {
                                        return 10 > param;
                                      }), value[0]), (function (param) {
                                    return Curry._2(IntMap$OptolithClient.lookup, x.id, staticSpells);
                                  })), (function (spell) {
                                return spell.property;
                              }));
                } else {
                  return /* Nothing */0;
                }
              }), Curry._1(IntMap$OptolithClient.elems, heroSpells));
}

function getMinSrFromPropertyKnowledge(counter, activePropertyKnowledges, staticEntry, heroEntry) {
  var hasActivePropertyKnowledge = ListH$OptolithClient.Foldable.any((function (sid) {
          if (typeof sid === "number" || sid[0] !== 61643255) {
            return false;
          } else {
            return sid[1] === staticEntry.property;
          }
        }), activePropertyKnowledges);
  if (hasActivePropertyKnowledge) {
    return Maybe$OptolithClient.Monad.$great$great$eq(Curry._2(IntMap$OptolithClient.lookup, staticEntry.property, counter), (function (count) {
                  if (flattenValue(heroEntry.value) >= 10 && count <= 3) {
                    return /* Just */[10];
                  } else {
                    return /* Nothing */0;
                  }
                }));
  } else {
    return /* Nothing */0;
  }
}

function getMinSrByDeps$1(heroSpells, heroEntry) {
  return Maybe$OptolithClient.Monad.$great$great$eq(Maybe$OptolithClient.ensure(ListH$OptolithClient.Extra.notNull, Dependencies$OptolithClient.flattenActivatableSkill((function (id) {
                        return getValueDef$3(Curry._2(IntMap$OptolithClient.lookup, id, heroSpells));
                      }), heroEntry.id, heroEntry.dependencies)), (function (param) {
                return ListH$OptolithClient.Foldable.foldr((function (d, acc) {
                              if (!d) {
                                return /* Just */[/* Inactive */0];
                              }
                              var next = d[0];
                              return Maybe$OptolithClient.maybe(/* Just */[/* Active */[next]], (function (prev) {
                                            if (prev) {
                                              return /* Just */[/* Active */[Int$OptolithClient.max(prev[0], next)]];
                                            } else {
                                              return /* Just */[/* Inactive */0];
                                            }
                                          }), acc);
                            }), /* Nothing */0, param);
              }));
}

function getMin$2(propertyKnowledge, staticSpells, heroSpells) {
  var counter = getValidSpellsForPropertyKnowledgeCounter(staticSpells, heroSpells);
  var activePropertyKnowledges = Activatable$OptolithClient.SelectOptions.getActiveSelections(propertyKnowledge);
  return (function (staticEntry, heroEntry) {
      return Maybe$OptolithClient.Functor.$less$amp$great(Maybe$OptolithClient.ensure(ListH$OptolithClient.Extra.notNull, Maybe$OptolithClient.catMaybes(/* :: */[
                          Maybe$OptolithClient.Monad.$great$great$eq(getMinSrByDeps$1(heroSpells, heroEntry), (function (x) {
                                  if (x) {
                                    return /* Just */[x[0]];
                                  } else {
                                    return /* Nothing */0;
                                  }
                                })),
                          /* :: */[
                            getMinSrFromPropertyKnowledge(counter, activePropertyKnowledges, staticEntry, heroEntry),
                            /* [] */0
                          ]
                        ])), ListH$OptolithClient.Foldable.maximum);
    });
}

function isDecreasable$2(propertyKnowledge, staticSpells, heroSpells) {
  var getMinCached = getMin$2(propertyKnowledge, staticSpells, heroSpells);
  return (function (staticEntry, heroEntry) {
      return flattenValue(heroEntry.value) > Maybe$OptolithClient.fromMaybe(0, Curry._2(getMinCached, staticEntry, heroEntry));
    });
}

var Spells = {
  getValueDef: getValueDef$3,
  flattenValue: flattenValue,
  isActive: isActive,
  getMaxSrFromPropertyKnowledge: getMaxSrFromPropertyKnowledge,
  getMax: getMax$2,
  isIncreasable: isIncreasable$2,
  getValidSpellsForPropertyKnowledgeCounter: getValidSpellsForPropertyKnowledgeCounter,
  getMinSrFromPropertyKnowledge: getMinSrFromPropertyKnowledge,
  getMinSrByDeps: getMinSrByDeps$1,
  getMin: getMin$2,
  isDecreasable: isDecreasable$2
};

function getValueDef$4(param) {
  return Maybe$OptolithClient.maybe(/* Inactive */0, (function (x) {
                return x.value;
              }), param);
}

function flattenValue$1(value) {
  if (value) {
    return value[0];
  } else {
    return 0;
  }
}

function isActive$1(param) {
  return Maybe$OptolithClient.maybe(false, (function (x) {
                var match = x.value;
                if (match) {
                  return true;
                } else {
                  return false;
                }
              }), param);
}

function getMaxSrFromAspectKnowledge(aspectKnowledge, staticEntry) {
  var hasRestriction = Maybe$OptolithClient.maybe(true, (function (actives) {
          return ListH$OptolithClient.Foldable.all((function (aspect) {
                        return ListH$OptolithClient.Foldable.notElem(/* `Generic */[
                                    61643255,
                                    aspect
                                  ], actives);
                      }), staticEntry.aspects);
        }), Maybe$OptolithClient.Functor.$less$amp$great(aspectKnowledge, Activatable$OptolithClient.SelectOptions.getActiveSelections));
  if (hasRestriction) {
    return /* Just */[14];
  } else {
    return /* Nothing */0;
  }
}

function getMax$3(startEl, phase, heroAttrs, exceptionalSkill, aspectKnowledge, staticEntry) {
  return getExceptionalSkillBonus(exceptionalSkill, /* `Spell */[
              345443720,
              staticEntry.id
            ]) + ListH$OptolithClient.Foldable.minimum(Maybe$OptolithClient.catMaybes(/* :: */[
                  /* Just */[getMaxSrByCheckAttrs(heroAttrs, staticEntry.check)],
                  /* :: */[
                    getMaxSrFromEl(startEl, phase),
                    /* :: */[
                      getMaxSrFromAspectKnowledge(aspectKnowledge, staticEntry),
                      /* [] */0
                    ]
                  ]
                ])) | 0;
}

function isIncreasable$3(startEl, phase, heroAttrs, exceptionalSkill, aspectKnowledge, staticEntry, heroEntry) {
  return flattenValue$1(heroEntry.value) < getMax$3(startEl, phase, heroAttrs, exceptionalSkill, aspectKnowledge, staticEntry);
}

function getValidLiturgicalChantsForAspectKnowledgeCounter(staticLiturgicalChants, heroLiturgicalChants) {
  return Curry._3(IntMap$OptolithClient.Foldable.foldr, (function (x, acc) {
                var value = x.value;
                if (value) {
                  return Maybe$OptolithClient.maybe(acc, (function (chant) {
                                return ListH$OptolithClient.Foldable.foldr((function (aspect) {
                                              return Curry._2(IntMap$OptolithClient.alter, (function (count) {
                                                            return /* Just */[Int$OptolithClient.inc(Maybe$OptolithClient.fromMaybe(0, count))];
                                                          }), aspect);
                                            }), acc, chant.aspects);
                              }), Maybe$OptolithClient.Monad.$great$great$eq(Maybe$OptolithClient.ensure((function (param) {
                                        return 10 > param;
                                      }), value[0]), (function (param) {
                                    return Curry._2(IntMap$OptolithClient.lookup, x.id, staticLiturgicalChants);
                                  })));
                } else {
                  return acc;
                }
              }), IntMap$OptolithClient.empty, heroLiturgicalChants);
}

function getMinSrFromAspectKnowledge(counter, activeAspectKnowledges, staticEntry, heroEntry) {
  var hasActiveAspectKnowledge = ListH$OptolithClient.Foldable.any((function (sid) {
          if (typeof sid === "number" || sid[0] !== 61643255) {
            return false;
          } else {
            return ListH$OptolithClient.Foldable.elem(sid[1], staticEntry.aspects);
          }
        }), activeAspectKnowledges);
  if (!hasActiveAspectKnowledge) {
    return /* Nothing */0;
  }
  var isRequired = ListH$OptolithClient.Foldable.any((function (aspect) {
          return Maybe$OptolithClient.maybe(false, (function (count) {
                        if (flattenValue$1(heroEntry.value) >= 10) {
                          return count <= 3;
                        } else {
                          return false;
                        }
                      }), Curry._2(IntMap$OptolithClient.lookup, aspect, counter));
        }), staticEntry.aspects);
  if (isRequired) {
    return /* Just */[10];
  } else {
    return /* Nothing */0;
  }
}

function getMinSrByDeps$2(heroLiturgicalChants, heroEntry) {
  return Maybe$OptolithClient.Monad.$great$great$eq(Maybe$OptolithClient.ensure(ListH$OptolithClient.Extra.notNull, Dependencies$OptolithClient.flattenActivatableSkill((function (id) {
                        return getValueDef$4(Curry._2(IntMap$OptolithClient.lookup, id, heroLiturgicalChants));
                      }), heroEntry.id, heroEntry.dependencies)), (function (param) {
                return ListH$OptolithClient.Foldable.foldr((function (d, acc) {
                              if (!d) {
                                return /* Just */[/* Inactive */0];
                              }
                              var next = d[0];
                              return Maybe$OptolithClient.maybe(/* Just */[/* Active */[next]], (function (prev) {
                                            if (prev) {
                                              return /* Just */[/* Active */[Int$OptolithClient.max(prev[0], next)]];
                                            } else {
                                              return /* Just */[/* Inactive */0];
                                            }
                                          }), acc);
                            }), /* Nothing */0, param);
              }));
}

function getMin$3(aspectKnowledge, staticLiturgicalChants, heroLiturgicalChants) {
  var counter = getValidLiturgicalChantsForAspectKnowledgeCounter(staticLiturgicalChants, heroLiturgicalChants);
  var activeAspectKnowledges = Activatable$OptolithClient.SelectOptions.getActiveSelections(aspectKnowledge);
  return (function (staticEntry, heroEntry) {
      return Maybe$OptolithClient.Functor.$less$amp$great(Maybe$OptolithClient.ensure(ListH$OptolithClient.Extra.notNull, Maybe$OptolithClient.catMaybes(/* :: */[
                          Maybe$OptolithClient.Monad.$great$great$eq(getMinSrByDeps$2(heroLiturgicalChants, heroEntry), (function (x) {
                                  if (x) {
                                    return /* Just */[x[0]];
                                  } else {
                                    return /* Nothing */0;
                                  }
                                })),
                          /* :: */[
                            getMinSrFromAspectKnowledge(counter, activeAspectKnowledges, staticEntry, heroEntry),
                            /* [] */0
                          ]
                        ])), ListH$OptolithClient.Foldable.maximum);
    });
}

function isDecreasable$3(aspectKnowledge, staticLiturgicalChants, heroLiturgicalChants) {
  var getMinCached = getMin$3(aspectKnowledge, staticLiturgicalChants, heroLiturgicalChants);
  return (function (staticEntry, heroEntry) {
      return flattenValue$1(heroEntry.value) > Maybe$OptolithClient.fromMaybe(0, Curry._2(getMinCached, staticEntry, heroEntry));
    });
}

var LiturgicalChants = {
  getValueDef: getValueDef$4,
  flattenValue: flattenValue$1,
  isActive: isActive$1,
  getMaxSrFromAspectKnowledge: getMaxSrFromAspectKnowledge,
  getMax: getMax$3,
  isIncreasable: isIncreasable$3,
  getValidLiturgicalChantsForAspectKnowledgeCounter: getValidLiturgicalChantsForAspectKnowledgeCounter,
  getMinSrFromAspectKnowledge: getMinSrFromAspectKnowledge,
  getMinSrByDeps: getMinSrByDeps$2,
  getMin: getMin$3,
  isDecreasable: isDecreasable$3
};

exports.Attributes = Attributes;
exports.Skills = Skills;
exports.CombatTechniques = CombatTechniques;
exports.Spells = Spells;
exports.LiturgicalChants = LiturgicalChants;
/* IntMap-OptolithClient Not a pure module */
