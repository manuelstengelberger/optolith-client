// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Json_decode from "@glennsl/bs-json/src/Json_decode.bs.js";

function l10n(json) {
  return /* tuple */[
          Json_decode.field("id", Json_decode.$$int, json),
          Json_decode.field("name", Json_decode.string, json)
        ];
}

function fromJson(yaml) {
  return Json_decode.list(l10n, yaml.arcaneBardTraditionsL10n);
}

var ArcaneBardTraditionsL10n = {
  fromJson: fromJson
};

function l10n$1(json) {
  return /* tuple */[
          Json_decode.field("id", Json_decode.$$int, json),
          Json_decode.field("name", Json_decode.string, json)
        ];
}

function fromJson$1(yaml) {
  return Json_decode.list(l10n$1, yaml.arcaneDancerTraditionsL10n);
}

var ArcaneDancerTraditionsL10n = {
  fromJson: fromJson$1
};

function l10n$2(json) {
  return /* tuple */[
          Json_decode.field("id", Json_decode.$$int, json),
          Json_decode.field("name", Json_decode.string, json)
        ];
}

function fromJson$2(yaml) {
  return Json_decode.list(l10n$2, yaml.armorTypesL10n);
}

var ArmorTypesL10n = {
  fromJson: fromJson$2
};

function l10n$3(json) {
  return /* tuple */[
          Json_decode.field("id", Json_decode.$$int, json),
          Json_decode.field("name", Json_decode.string, json)
        ];
}

function fromJson$3(yaml) {
  return Json_decode.list(l10n$3, yaml.aspectsL10n);
}

var AspectsL10n = {
  fromJson: fromJson$3
};

function l10n$4(json) {
  return /* tuple */[
          Json_decode.field("id", Json_decode.$$int, json),
          Json_decode.field("name", Json_decode.string, json)
        ];
}

function fromJson$4(yaml) {
  return Json_decode.list(l10n$4, yaml.combatSpecialAbilityGroupsL10n);
}

var CombatSpecialAbilityGroupsL10n = {
  fromJson: fromJson$4
};

function l10n$5(json) {
  return /* tuple */[
          Json_decode.field("id", Json_decode.$$int, json),
          Json_decode.field("name", Json_decode.string, json)
        ];
}

function fromJson$5(yaml) {
  return Json_decode.list(l10n$5, yaml.combatTechniqueGroupsL10n);
}

var CombatTechniqueGroupsL10n = {
  fromJson: fromJson$5
};

function l10n$6(json) {
  return /* tuple */[
          Json_decode.field("id", Json_decode.$$int, json),
          Json_decode.field("name", Json_decode.string, json)
        ];
}

function fromJson$6(yaml) {
  return Json_decode.list(l10n$6, yaml.equipmentGroupsL10n);
}

var EquipmentGroupsL10n = {
  fromJson: fromJson$6
};

function l10n$7(json) {
  return /* tuple */[
          Json_decode.field("id", Json_decode.$$int, json),
          Json_decode.field("name", Json_decode.string, json)
        ];
}

function fromJson$7(yaml) {
  return Json_decode.list(l10n$7, yaml.eyeColorsL10n);
}

var EyeColorsL10n = {
  fromJson: fromJson$7
};

function l10n$8(json) {
  return /* tuple */[
          Json_decode.field("id", Json_decode.$$int, json),
          Json_decode.field("name", Json_decode.string, json)
        ];
}

function fromJson$8(yaml) {
  return Json_decode.list(l10n$8, yaml.hairColorsL10n);
}

var HairColorsL10n = {
  fromJson: fromJson$8
};

function l10n$9(json) {
  return /* tuple */[
          Json_decode.field("id", Json_decode.$$int, json),
          Json_decode.field("name", Json_decode.string, json)
        ];
}

function fromJson$9(yaml) {
  return Json_decode.list(l10n$9, yaml.liturgicalChantGroupsL10n);
}

var LiturgicalChantGroupsL10n = {
  fromJson: fromJson$9
};

function l10n$10(json) {
  return /* tuple */[
          Json_decode.field("id", Json_decode.$$int, json),
          Json_decode.field("name", Json_decode.string, json)
        ];
}

function fromJson$10(yaml) {
  return Json_decode.list(l10n$10, yaml.propertiesL10n);
}

var PropertiesL10n = {
  fromJson: fromJson$10
};

function l10n$11(json) {
  return /* tuple */[
          Json_decode.field("id", Json_decode.$$int, json),
          Json_decode.field("name", Json_decode.string, json)
        ];
}

function fromJson$11(yaml) {
  return Json_decode.list(l10n$11, yaml.reachesL10n);
}

var ReachesL10n = {
  fromJson: fromJson$11
};

function l10n$12(json) {
  return /* tuple */[
          Json_decode.field("id", Json_decode.$$int, json),
          Json_decode.field("name", Json_decode.string, json)
        ];
}

function fromJson$12(yaml) {
  return Json_decode.list(l10n$12, yaml.socialStatusesL10n);
}

var SocialStatusesL10n = {
  fromJson: fromJson$12
};

function l10n$13(json) {
  return /* tuple */[
          Json_decode.field("id", Json_decode.$$int, json),
          Json_decode.field("name", Json_decode.string, json)
        ];
}

function fromJson$13(yaml) {
  return Json_decode.list(l10n$13, yaml.specialAbilityGroupsL10n);
}

var SpecialAbilityGroupsL10n = {
  fromJson: fromJson$13
};

function l10n$14(json) {
  return /* tuple */[
          Json_decode.field("id", Json_decode.$$int, json),
          Json_decode.field("name", Json_decode.string, json)
        ];
}

function fromJson$14(yaml) {
  return Json_decode.list(l10n$14, yaml.spellGroupsL10n);
}

var SpellGroupsL10n = {
  fromJson: fromJson$14
};

function l10n$15(json) {
  return /* tuple */[
          Json_decode.field("id", Json_decode.$$int, json),
          Json_decode.field("name", Json_decode.string, json)
        ];
}

function fromJson$15(yaml) {
  return Json_decode.list(l10n$15, yaml.subjectsL10n);
}

var SubjectsL10n = {
  fromJson: fromJson$15
};

function l10n$16(json) {
  return /* tuple */[
          Json_decode.field("id", Json_decode.string, json),
          Json_decode.field("name", Json_decode.string, json)
        ];
}

function fromJson$16(param) {
  return Json_decode.list(l10n$16, param);
}

var SupportedLanguagesL10n = {
  fromJson: fromJson$16
};

function l10n$17(json) {
  return /* tuple */[
          Json_decode.field("id", Json_decode.$$int, json),
          Json_decode.field("name", Json_decode.string, json)
        ];
}

function fromJson$17(yaml) {
  return Json_decode.list(l10n$17, yaml.tribesL10n);
}

var TribesL10n = {
  fromJson: fromJson$17
};

export {
  ArcaneBardTraditionsL10n ,
  ArcaneDancerTraditionsL10n ,
  ArmorTypesL10n ,
  AspectsL10n ,
  CombatSpecialAbilityGroupsL10n ,
  CombatTechniqueGroupsL10n ,
  EquipmentGroupsL10n ,
  EyeColorsL10n ,
  HairColorsL10n ,
  LiturgicalChantGroupsL10n ,
  PropertiesL10n ,
  ReachesL10n ,
  SocialStatusesL10n ,
  SpecialAbilityGroupsL10n ,
  SpellGroupsL10n ,
  SubjectsL10n ,
  SupportedLanguagesL10n ,
  TribesL10n ,
  
}
/* No side effect */
