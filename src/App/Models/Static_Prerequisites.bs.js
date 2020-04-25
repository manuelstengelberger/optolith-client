// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var ListH$OptolithClient = require("../../Data/ListH.bs.js");
var Maybe$OptolithClient = require("../../Data/Maybe.bs.js");
var IntMap$OptolithClient = require("../../Data/IntMap.bs.js");
var JsonStrict$OptolithClient = require("../Utilities/YAML/JsonStrict.bs.js");

function partial_arg_000(param) {
  return Json_decode.map((function (id) {
                return /* One */Block.__(0, [id]);
              }), Json_decode.$$int, param);
}

var partial_arg_001 = /* :: */[
  (function (param) {
      return Json_decode.map((function (id) {
                    return /* Many */Block.__(1, [id]);
                  }), (function (param) {
                    return Json_decode.list(Json_decode.$$int, param);
                  }), param);
    }),
  /* [] */0
];

var partial_arg = /* :: */[
  partial_arg_000,
  partial_arg_001
];

function oneOrManyInt(param) {
  return Json_decode.oneOf(partial_arg, param);
}

function sex(json) {
  var str = Json_decode.string(json);
  switch (str) {
    case "f" :
        return /* Female */1;
    case "m" :
        return /* Male */0;
    default:
      throw [
            Json_decode.DecodeError,
            "Unknown sex prerequisite: " + str
          ];
  }
}

function partial_arg_000$1(json) {
  return {
          id: Curry._1(oneOrManyInt, json),
          active: true
        };
}

var partial_arg_001$1 = /* :: */[
  (function (json) {
      return {
              id: Json_decode.field("id", oneOrManyInt, json),
              active: Json_decode.field("active", Json_decode.bool, json)
            };
    }),
  /* [] */0
];

var partial_arg$1 = /* :: */[
  partial_arg_000$1,
  partial_arg_001$1
];

function race(param) {
  return Json_decode.oneOf(partial_arg$1, param);
}

function primaryAttribute(json) {
  var str = Json_decode.field("type", Json_decode.string, json);
  var tmp;
  switch (str) {
    case "blessed" :
        tmp = /* Blessed */1;
        break;
    case "magical" :
        tmp = /* Magical */0;
        break;
    default:
      throw [
            Json_decode.DecodeError,
            "Unknown primary attribute type: " + str
          ];
  }
  return {
          value: Json_decode.field("value", Json_decode.$$int, json),
          scope: tmp
        };
}

function pact(json) {
  return {
          category: Json_decode.field("category", Json_decode.$$int, json),
          domain: Json_decode.field("domain", (function (param) {
                  return JsonStrict$OptolithClient.maybe(oneOrManyInt, param);
                }), json),
          level: Json_decode.field("level", (function (param) {
                  return JsonStrict$OptolithClient.maybe(Json_decode.$$int, param);
                }), json)
        };
}

function activatableId(json) {
  var scope = Json_decode.field("scope", Json_decode.string, json);
  switch (scope) {
    case "Advantage" :
        return /* `Advantage */[
                -41058677,
                Json_decode.$$int(json)
              ];
    case "Disadvantage" :
        return /* `Disadvantage */[
                255955901,
                Json_decode.$$int(json)
              ];
    case "SpecialAbility" :
        return /* `SpecialAbility */[
                -789492591,
                Json_decode.$$int(json)
              ];
    default:
      throw [
            Json_decode.DecodeError,
            "Unknown activatable ID scope: " + scope
          ];
  }
}

function scopedSelectOptionId(json) {
  var scope = Json_decode.field("scope", Json_decode.string, json);
  switch (scope) {
    case "Blessing" :
        return /* `Blessing */[
                797131559,
                Json_decode.$$int(json)
              ];
    case "Cantrip" :
        return /* `Cantrip */[
                -841776939,
                Json_decode.$$int(json)
              ];
    case "CombatTechnique" :
        return /* `CombatTechnique */[
                -920806756,
                Json_decode.$$int(json)
              ];
    case "LiturgicalChant" :
        return /* `LiturgicalChant */[
                -384382742,
                Json_decode.$$int(json)
              ];
    case "Skill" :
        return /* `Skill */[
                290194801,
                Json_decode.$$int(json)
              ];
    case "Spell" :
        return /* `Spell */[
                345443720,
                Json_decode.$$int(json)
              ];
    default:
      throw [
            Json_decode.DecodeError,
            "Unknown select option ID scope: " + scope
          ];
  }
}

function selectOptionId(json) {
  return Json_decode.oneOf(/* :: */[
              (function (param) {
                  return Json_decode.map((function (x) {
                                return /* `Generic */[
                                        61643255,
                                        x
                                      ];
                              }), Json_decode.$$int, param);
                }),
              /* :: */[
                scopedSelectOptionId,
                /* [] */0
              ]
            ], json);
}

function activatable(json) {
  return {
          id: Json_decode.field("id", activatableId, json),
          active: Json_decode.field("active", Json_decode.bool, json),
          sid: Json_decode.field("sid", (function (param) {
                  return JsonStrict$OptolithClient.maybe(selectOptionId, param);
                }), json),
          sid2: Json_decode.field("sid2", (function (param) {
                  return JsonStrict$OptolithClient.maybe(selectOptionId, param);
                }), json),
          level: Json_decode.field("level", (function (param) {
                  return JsonStrict$OptolithClient.maybe(Json_decode.$$int, param);
                }), json)
        };
}

function activatableMultiEntry(json) {
  return {
          id: Json_decode.field("id", (function (param) {
                  return Json_decode.list(activatableId, param);
                }), json),
          active: Json_decode.field("active", Json_decode.bool, json),
          sid: Json_decode.field("sid", (function (param) {
                  return JsonStrict$OptolithClient.maybe(selectOptionId, param);
                }), json),
          sid2: Json_decode.field("sid2", (function (param) {
                  return JsonStrict$OptolithClient.maybe(selectOptionId, param);
                }), json),
          level: Json_decode.field("level", (function (param) {
                  return JsonStrict$OptolithClient.maybe(Json_decode.$$int, param);
                }), json)
        };
}

function activatableMultiSelect(json) {
  return {
          id: Json_decode.field("id", activatableId, json),
          active: Json_decode.field("active", Json_decode.bool, json),
          sid: Json_decode.field("sid", (function (param) {
                  return Json_decode.list(selectOptionId, param);
                }), json),
          sid2: Json_decode.field("sid2", (function (param) {
                  return JsonStrict$OptolithClient.maybe(selectOptionId, param);
                }), json),
          level: Json_decode.field("tier", (function (param) {
                  return JsonStrict$OptolithClient.maybe(Json_decode.$$int, param);
                }), json)
        };
}

function activatableSkillId(json) {
  var scope = Json_decode.field("scope", Json_decode.string, json);
  switch (scope) {
    case "LiturgicalChant" :
        return /* `LiturgicalChant */[
                -384382742,
                Json_decode.$$int(json)
              ];
    case "Spell" :
        return /* `Spell */[
                345443720,
                Json_decode.$$int(json)
              ];
    default:
      throw [
            Json_decode.DecodeError,
            "Unknown activatable skill ID scope: " + scope
          ];
  }
}

function activatableSkill(json) {
  return {
          id: Json_decode.field("id", activatableSkillId, json),
          active: Json_decode.field("active", Json_decode.bool, json)
        };
}

function increasableId(json) {
  var scope = Json_decode.field("scope", Json_decode.string, json);
  switch (scope) {
    case "Attribute" :
        return /* `Attribute */[
                482562044,
                Json_decode.$$int(json)
              ];
    case "CombatTechnique" :
        return /* `CombatTechnique */[
                -920806756,
                Json_decode.$$int(json)
              ];
    case "LiturgicalChant" :
        return /* `LiturgicalChant */[
                -384382742,
                Json_decode.$$int(json)
              ];
    case "Skill" :
        return /* `Skill */[
                290194801,
                Json_decode.$$int(json)
              ];
    case "Spell" :
        return /* `Spell */[
                345443720,
                Json_decode.$$int(json)
              ];
    default:
      throw [
            Json_decode.DecodeError,
            "Unknown increasable ID scope: " + scope
          ];
  }
}

function increasable(json) {
  return {
          id: Json_decode.field("id", increasableId, json),
          value: Json_decode.field("value", Json_decode.$$int, json)
        };
}

function increasableMultiEntry(json) {
  return {
          id: Json_decode.field("id", (function (param) {
                  return Json_decode.list(increasableId, param);
                }), json),
          value: Json_decode.field("value", Json_decode.$$int, json)
        };
}

function tProfession(json) {
  return {
          sex: JsonStrict$OptolithClient.optionalField("sexPrerequisite", sex, json),
          race: JsonStrict$OptolithClient.optionalField("racePrerequisite", race, json),
          culture: JsonStrict$OptolithClient.optionalField("culturePrerequisite", oneOrManyInt, json),
          activatable: Maybe$OptolithClient.fromMaybe(/* [] */0, JsonStrict$OptolithClient.optionalField("activatablePrerequisites", (function (param) {
                      return Json_decode.list(activatable, param);
                    }), json)),
          increasable: Maybe$OptolithClient.fromMaybe(/* [] */0, JsonStrict$OptolithClient.optionalField("increasablePrerequisites", (function (param) {
                      return Json_decode.list(increasable, param);
                    }), json))
        };
}

function t(json) {
  return {
          sex: JsonStrict$OptolithClient.optionalField("sexPrerequisite", sex, json),
          race: JsonStrict$OptolithClient.optionalField("racePrerequisite", race, json),
          culture: JsonStrict$OptolithClient.optionalField("culturePrerequisite", oneOrManyInt, json),
          pact: JsonStrict$OptolithClient.optionalField("pactPrerequisite", pact, json),
          social: JsonStrict$OptolithClient.optionalField("socialStatusPrerequisite", Json_decode.$$int, json),
          primaryAttribute: JsonStrict$OptolithClient.optionalField("primaryAttributePrerequisite", primaryAttribute, json),
          activatable: Maybe$OptolithClient.fromMaybe(/* [] */0, JsonStrict$OptolithClient.optionalField("activatablePrerequisites", (function (param) {
                      return Json_decode.list(activatable, param);
                    }), json)),
          activatableMultiEntry: Maybe$OptolithClient.fromMaybe(/* [] */0, JsonStrict$OptolithClient.optionalField("activatableMultiEntryPrerequisites", (function (param) {
                      return Json_decode.list(activatableMultiEntry, param);
                    }), json)),
          activatableMultiSelect: Maybe$OptolithClient.fromMaybe(/* [] */0, JsonStrict$OptolithClient.optionalField("activatableMultiSelectPrerequisites", (function (param) {
                      return Json_decode.list(activatableMultiSelect, param);
                    }), json)),
          increasable: Maybe$OptolithClient.fromMaybe(/* [] */0, JsonStrict$OptolithClient.optionalField("increasablePrerequisites", (function (param) {
                      return Json_decode.list(increasable, param);
                    }), json)),
          increasableMultiEntry: Maybe$OptolithClient.fromMaybe(/* [] */0, JsonStrict$OptolithClient.optionalField("increasableMultiEntryPrerequisites", (function (param) {
                      return Json_decode.list(increasableMultiEntry, param);
                    }), json))
        };
}

function level(json) {
  return /* tuple */[
          Json_decode.field("level", Json_decode.$$int, json),
          t(json)
        ];
}

function tWithLevel(json) {
  return {
          sex: JsonStrict$OptolithClient.optionalField("sexPrerequisite", sex, json),
          race: JsonStrict$OptolithClient.optionalField("racePrerequisite", race, json),
          culture: JsonStrict$OptolithClient.optionalField("culturePrerequisite", oneOrManyInt, json),
          pact: JsonStrict$OptolithClient.optionalField("pactPrerequisite", pact, json),
          social: JsonStrict$OptolithClient.optionalField("socialStatusPrerequisite", Json_decode.$$int, json),
          primaryAttribute: JsonStrict$OptolithClient.optionalField("primaryAttributePrerequisite", primaryAttribute, json),
          activatable: Maybe$OptolithClient.fromMaybe(/* [] */0, JsonStrict$OptolithClient.optionalField("activatablePrerequisites", (function (param) {
                      return Json_decode.list(activatable, param);
                    }), json)),
          activatableMultiEntry: Maybe$OptolithClient.fromMaybe(/* [] */0, JsonStrict$OptolithClient.optionalField("activatableMultiEntryPrerequisites", (function (param) {
                      return Json_decode.list(activatableMultiEntry, param);
                    }), json)),
          activatableMultiSelect: Maybe$OptolithClient.fromMaybe(/* [] */0, JsonStrict$OptolithClient.optionalField("activatableMultiSelectPrerequisites", (function (param) {
                      return Json_decode.list(activatableMultiSelect, param);
                    }), json)),
          increasable: Maybe$OptolithClient.fromMaybe(/* [] */0, JsonStrict$OptolithClient.optionalField("increasablePrerequisites", (function (param) {
                      return Json_decode.list(increasable, param);
                    }), json)),
          increasableMultiEntry: Maybe$OptolithClient.fromMaybe(/* [] */0, JsonStrict$OptolithClient.optionalField("increasableMultiEntryPrerequisites", (function (param) {
                      return Json_decode.list(increasableMultiEntry, param);
                    }), json)),
          levels: Curry._1(IntMap$OptolithClient.fromList, Maybe$OptolithClient.fromMaybe(/* [] */0, JsonStrict$OptolithClient.optionalField("levelPrerequisites", (function (param) {
                          return Json_decode.list(level, param);
                        }), json)))
        };
}

function tWithLevelDisAdv(json) {
  return {
          commonSuggestedByRCP: Json_decode.field("hasToBeCommonOrSuggestedByRCP", Json_decode.bool, json),
          sex: JsonStrict$OptolithClient.optionalField("sexPrerequisite", sex, json),
          race: JsonStrict$OptolithClient.optionalField("racePrerequisite", race, json),
          culture: JsonStrict$OptolithClient.optionalField("culturePrerequisite", oneOrManyInt, json),
          pact: JsonStrict$OptolithClient.optionalField("pactPrerequisite", pact, json),
          social: JsonStrict$OptolithClient.optionalField("socialStatusPrerequisite", Json_decode.$$int, json),
          primaryAttribute: JsonStrict$OptolithClient.optionalField("primaryAttributePrerequisite", primaryAttribute, json),
          activatable: Maybe$OptolithClient.fromMaybe(/* [] */0, JsonStrict$OptolithClient.optionalField("activatablePrerequisites", (function (param) {
                      return Json_decode.list(activatable, param);
                    }), json)),
          activatableMultiEntry: Maybe$OptolithClient.fromMaybe(/* [] */0, JsonStrict$OptolithClient.optionalField("activatableMultiEntryPrerequisites", (function (param) {
                      return Json_decode.list(activatableMultiEntry, param);
                    }), json)),
          activatableMultiSelect: Maybe$OptolithClient.fromMaybe(/* [] */0, JsonStrict$OptolithClient.optionalField("activatableMultiSelectPrerequisites", (function (param) {
                      return Json_decode.list(activatableMultiSelect, param);
                    }), json)),
          increasable: Maybe$OptolithClient.fromMaybe(/* [] */0, JsonStrict$OptolithClient.optionalField("increasablePrerequisites", (function (param) {
                      return Json_decode.list(increasable, param);
                    }), json)),
          increasableMultiEntry: Maybe$OptolithClient.fromMaybe(/* [] */0, JsonStrict$OptolithClient.optionalField("increasableMultiEntryPrerequisites", (function (param) {
                      return Json_decode.list(increasableMultiEntry, param);
                    }), json)),
          levels: Curry._1(IntMap$OptolithClient.fromList, Maybe$OptolithClient.fromMaybe(/* [] */0, JsonStrict$OptolithClient.optionalField("levelPrerequisites", (function (param) {
                          return Json_decode.list(level, param);
                        }), json)))
        };
}

function replacementAtIndex(json) {
  return /* tuple */[
          Json_decode.field("index", Json_decode.$$int, json),
          Json_decode.field("replacement", Json_decode.string, json)
        ];
}

function tIndexL10n(json) {
  return {
          sex: JsonStrict$OptolithClient.optionalField("sexPrerequisite", Json_decode.string, json),
          race: JsonStrict$OptolithClient.optionalField("racePrerequisite", Json_decode.string, json),
          culture: JsonStrict$OptolithClient.optionalField("culturePrerequisite", Json_decode.string, json),
          pact: JsonStrict$OptolithClient.optionalField("pactPrerequisite", Json_decode.string, json),
          social: JsonStrict$OptolithClient.optionalField("socialStatusPrerequisite", Json_decode.string, json),
          primaryAttribute: JsonStrict$OptolithClient.optionalField("primaryAttributePrerequisite", Json_decode.string, json),
          activatable: JsonStrict$OptolithClient.optionalField("activatablePrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json),
          activatableMultiEntry: JsonStrict$OptolithClient.optionalField("activatableMultiEntryPrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json),
          activatableMultiSelect: JsonStrict$OptolithClient.optionalField("activatableMultiSelectPrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json),
          increasable: JsonStrict$OptolithClient.optionalField("increasablePrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json),
          increasableMultiEntry: JsonStrict$OptolithClient.optionalField("increasableMultiEntryPrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json)
        };
}

function tIndexUniv(json) {
  return {
          sex: JsonStrict$OptolithClient.optionalField("sexPrerequisite", Json_decode.bool, json),
          race: JsonStrict$OptolithClient.optionalField("racePrerequisite", Json_decode.bool, json),
          culture: JsonStrict$OptolithClient.optionalField("culturePrerequisite", Json_decode.bool, json),
          pact: JsonStrict$OptolithClient.optionalField("pactPrerequisite", Json_decode.bool, json),
          social: JsonStrict$OptolithClient.optionalField("socialStatusPrerequisite", Json_decode.bool, json),
          primaryAttribute: JsonStrict$OptolithClient.optionalField("primaryAttributePrerequisite", Json_decode.bool, json),
          activatable: JsonStrict$OptolithClient.optionalField("activatablePrerequisites", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json),
          activatableMultiEntry: JsonStrict$OptolithClient.optionalField("activatableMultiEntryPrerequisites", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json),
          activatableMultiSelect: JsonStrict$OptolithClient.optionalField("activatableMultiSelectPrerequisites", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json),
          increasable: JsonStrict$OptolithClient.optionalField("increasablePrerequisites", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json),
          increasableMultiEntry: JsonStrict$OptolithClient.optionalField("increasableMultiEntryPrerequisites", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json)
        };
}

function mergeSingleOverride(univ, l10n) {
  return Maybe$OptolithClient.Alternative.$less$pipe$great(Maybe$OptolithClient.Functor.$less$amp$great(l10n, (function (x) {
                    return /* ReplaceWith */[x];
                  })), Maybe$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                    if (x) {
                      return /* Just */[/* Hide */0];
                    } else {
                      return /* Nothing */0;
                    }
                  })));
}

function mergeMapOverride(univ, l10n) {
  var mp = ListH$OptolithClient.Foldable.foldr((function (x) {
          return Curry._2(IntMap$OptolithClient.insert, x, /* Hide */0);
        }), IntMap$OptolithClient.empty, Maybe$OptolithClient.fromMaybe(/* [] */0, univ));
  return ListH$OptolithClient.Foldable.foldr((function (param) {
                return Curry._2(IntMap$OptolithClient.insert, param[0], /* ReplaceWith */[param[1]]);
              }), mp, Maybe$OptolithClient.fromMaybe(/* [] */0, l10n));
}

function tIndex(univ, l10n) {
  return {
          sex: mergeSingleOverride(Maybe$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.sex;
                    })), Maybe$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.sex;
                    }))),
          race: mergeSingleOverride(Maybe$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.race;
                    })), Maybe$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.race;
                    }))),
          culture: mergeSingleOverride(Maybe$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.culture;
                    })), Maybe$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.culture;
                    }))),
          pact: mergeSingleOverride(Maybe$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.pact;
                    })), Maybe$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.pact;
                    }))),
          social: mergeSingleOverride(Maybe$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.social;
                    })), Maybe$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.social;
                    }))),
          primaryAttribute: mergeSingleOverride(Maybe$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.primaryAttribute;
                    })), Maybe$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.primaryAttribute;
                    }))),
          activatable: mergeMapOverride(Maybe$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.activatable;
                    })), Maybe$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.activatable;
                    }))),
          activatableMultiEntry: mergeMapOverride(Maybe$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.activatableMultiEntry;
                    })), Maybe$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.activatableMultiEntry;
                    }))),
          activatableMultiSelect: mergeMapOverride(Maybe$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.activatableMultiSelect;
                    })), Maybe$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.activatableMultiSelect;
                    }))),
          increasable: mergeMapOverride(Maybe$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.increasable;
                    })), Maybe$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.increasable;
                    }))),
          increasableMultiEntry: mergeMapOverride(Maybe$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.increasableMultiEntry;
                    })), Maybe$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.increasableMultiEntry;
                    })))
        };
}

function tIndexL10nAtLevel(json) {
  return /* tuple */[
          Json_decode.field("level", Json_decode.$$int, json),
          Json_decode.field("hide", tIndexL10n, json)
        ];
}

function tIndexWithLevelL10n(json) {
  return {
          sex: JsonStrict$OptolithClient.optionalField("sexPrerequisite", Json_decode.string, json),
          race: JsonStrict$OptolithClient.optionalField("racePrerequisite", Json_decode.string, json),
          culture: JsonStrict$OptolithClient.optionalField("culturePrerequisite", Json_decode.string, json),
          pact: JsonStrict$OptolithClient.optionalField("pactPrerequisite", Json_decode.string, json),
          social: JsonStrict$OptolithClient.optionalField("socialStatusPrerequisite", Json_decode.string, json),
          primaryAttribute: JsonStrict$OptolithClient.optionalField("primaryAttributePrerequisite", Json_decode.string, json),
          activatable: JsonStrict$OptolithClient.optionalField("activatablePrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json),
          activatableMultiEntry: JsonStrict$OptolithClient.optionalField("activatableMultiEntryPrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json),
          activatableMultiSelect: JsonStrict$OptolithClient.optionalField("activatableMultiSelectPrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json),
          increasable: JsonStrict$OptolithClient.optionalField("increasablePrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json),
          increasableMultiEntry: JsonStrict$OptolithClient.optionalField("increasableMultiEntryPrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json),
          levels: JsonStrict$OptolithClient.optionalField("levels", (function (param) {
                  return Json_decode.list(tIndexL10nAtLevel, param);
                }), json)
        };
}

function tIndexUnivAtLevel(json) {
  return /* tuple */[
          Json_decode.field("level", Json_decode.$$int, json),
          Json_decode.field("hide", tIndexUniv, json)
        ];
}

function tIndexWithLevelUniv(json) {
  return {
          sex: JsonStrict$OptolithClient.optionalField("sexPrerequisite", Json_decode.bool, json),
          race: JsonStrict$OptolithClient.optionalField("racePrerequisite", Json_decode.bool, json),
          culture: JsonStrict$OptolithClient.optionalField("culturePrerequisite", Json_decode.bool, json),
          pact: JsonStrict$OptolithClient.optionalField("pactPrerequisite", Json_decode.bool, json),
          social: JsonStrict$OptolithClient.optionalField("socialStatusPrerequisite", Json_decode.bool, json),
          primaryAttribute: JsonStrict$OptolithClient.optionalField("primaryAttributePrerequisite", Json_decode.bool, json),
          activatable: JsonStrict$OptolithClient.optionalField("activatablePrerequisites", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json),
          activatableMultiEntry: JsonStrict$OptolithClient.optionalField("activatableMultiEntryPrerequisites", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json),
          activatableMultiSelect: JsonStrict$OptolithClient.optionalField("activatableMultiSelectPrerequisites", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json),
          increasable: JsonStrict$OptolithClient.optionalField("increasablePrerequisites", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json),
          increasableMultiEntry: JsonStrict$OptolithClient.optionalField("increasableMultiEntryPrerequisites", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json),
          levels: JsonStrict$OptolithClient.optionalField("levels", (function (param) {
                  return Json_decode.list(tIndexUnivAtLevel, param);
                }), json)
        };
}

function mergeIndexLevels(univ, l10n) {
  var mp = ListH$OptolithClient.Foldable.foldr((function (param) {
          return Curry._2(IntMap$OptolithClient.insert, param[0], /* tuple */[
                      /* Just */[param[1]],
                      /* Nothing */0
                    ]);
        }), IntMap$OptolithClient.empty, Maybe$OptolithClient.fromMaybe(/* [] */0, univ));
  return Curry._2(IntMap$OptolithClient.map, (function (param) {
                return tIndex(param[0], param[1]);
              }), ListH$OptolithClient.Foldable.foldr((function (param) {
                    var x = param[1];
                    return Curry._2(IntMap$OptolithClient.alter, (function (my) {
                                  return /* Just */[Maybe$OptolithClient.maybe(/* tuple */[
                                                /* Nothing */0,
                                                /* Just */[x]
                                              ], (function (y) {
                                                  return /* tuple */[
                                                          y[0],
                                                          /* Just */[x]
                                                        ];
                                                }), my)];
                                }), param[0]);
                  }), mp, Maybe$OptolithClient.fromMaybe(/* [] */0, l10n)));
}

function tIndexWithLevel(univ, l10n) {
  return {
          sex: mergeSingleOverride(Maybe$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.sex;
                    })), Maybe$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.sex;
                    }))),
          race: mergeSingleOverride(Maybe$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.race;
                    })), Maybe$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.race;
                    }))),
          culture: mergeSingleOverride(Maybe$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.culture;
                    })), Maybe$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.culture;
                    }))),
          pact: mergeSingleOverride(Maybe$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.pact;
                    })), Maybe$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.pact;
                    }))),
          social: mergeSingleOverride(Maybe$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.social;
                    })), Maybe$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.social;
                    }))),
          primaryAttribute: mergeSingleOverride(Maybe$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.primaryAttribute;
                    })), Maybe$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.primaryAttribute;
                    }))),
          activatable: mergeMapOverride(Maybe$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.activatable;
                    })), Maybe$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.activatable;
                    }))),
          activatableMultiEntry: mergeMapOverride(Maybe$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.activatableMultiEntry;
                    })), Maybe$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.activatableMultiEntry;
                    }))),
          activatableMultiSelect: mergeMapOverride(Maybe$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.activatableMultiSelect;
                    })), Maybe$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.activatableMultiSelect;
                    }))),
          increasable: mergeMapOverride(Maybe$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.increasable;
                    })), Maybe$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.increasable;
                    }))),
          increasableMultiEntry: mergeMapOverride(Maybe$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.increasableMultiEntry;
                    })), Maybe$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.increasableMultiEntry;
                    }))),
          levels: mergeIndexLevels(Maybe$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.levels;
                    })), Maybe$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.levels;
                    })))
        };
}

var Decode = {
  oneOrManyInt: oneOrManyInt,
  sex: sex,
  race: race,
  culture: oneOrManyInt,
  primaryAttribute: primaryAttribute,
  pact: pact,
  socialStatus: Json_decode.$$int,
  activatableId: activatableId,
  scopedSelectOptionId: scopedSelectOptionId,
  selectOptionId: selectOptionId,
  activatable: activatable,
  activatableMultiEntry: activatableMultiEntry,
  activatableMultiSelect: activatableMultiSelect,
  activatableSkillId: activatableSkillId,
  activatableSkill: activatableSkill,
  increasableId: increasableId,
  increasable: increasable,
  increasableMultiEntry: increasableMultiEntry,
  tProfession: tProfession,
  t: t,
  level: level,
  tWithLevel: tWithLevel,
  tWithLevelDisAdv: tWithLevelDisAdv,
  replacementAtIndex: replacementAtIndex,
  tIndexL10n: tIndexL10n,
  tIndexUniv: tIndexUniv,
  mergeSingleOverride: mergeSingleOverride,
  mergeMapOverride: mergeMapOverride,
  tIndex: tIndex,
  tIndexL10nAtLevel: tIndexL10nAtLevel,
  tIndexWithLevelL10n: tIndexWithLevelL10n,
  tIndexUnivAtLevel: tIndexUnivAtLevel,
  tIndexWithLevelUniv: tIndexWithLevelUniv,
  mergeIndexLevels: mergeIndexLevels,
  tIndexWithLevel: tIndexWithLevel
};

var empty = {
  sex: /* Nothing */0,
  race: /* Nothing */0,
  culture: /* Nothing */0,
  pact: /* Nothing */0,
  social: /* Nothing */0,
  primaryAttribute: /* Nothing */0,
  activatable: /* [] */0,
  activatableMultiEntry: /* [] */0,
  activatableMultiSelect: /* [] */0,
  increasable: /* [] */0,
  increasableMultiEntry: /* [] */0
};

exports.empty = empty;
exports.Decode = Decode;
/* IntMap-OptolithClient Not a pure module */