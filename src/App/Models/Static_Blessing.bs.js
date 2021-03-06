// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Int$OptolithClient = require("../../Data/Int.bs.js");
var IntMap$OptolithClient = require("../../Data/IntMap.bs.js");
var IntSet$OptolithClient = require("../../Data/IntSet.bs.js");
var Yaml_Zip$OptolithClient = require("../Utilities/Yaml_Zip.bs.js");
var Static_Erratum$OptolithClient = require("./Static_Erratum.bs.js");
var Static_SourceRef$OptolithClient = require("./Static_SourceRef.bs.js");

function tL10n(json) {
  return {
          id: Json_decode.field("id", Json_decode.$$int, json),
          name: Json_decode.field("name", Json_decode.string, json),
          effect: Json_decode.field("effect", Json_decode.string, json),
          range: Json_decode.field("range", Json_decode.string, json),
          duration: Json_decode.field("duration", Json_decode.string, json),
          target: Json_decode.field("target", Json_decode.string, json),
          src: Json_decode.field("src", Static_SourceRef$OptolithClient.Decode.list, json),
          errata: Json_decode.field("errata", Static_Erratum$OptolithClient.Decode.list, json)
        };
}

function tUniv(json) {
  return {
          id: Json_decode.field("id", Json_decode.$$int, json),
          traditions: Json_decode.field("traditions", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json)
        };
}

function t(univ, l10n) {
  return /* tuple */[
          univ.id,
          {
            id: univ.id,
            name: l10n.name,
            effect: l10n.effect,
            range: l10n.range,
            duration: l10n.duration,
            target: l10n.target,
            traditions: Curry._1(IntSet$OptolithClient.fromList, univ.traditions),
            src: l10n.src,
            errata: l10n.errata
          }
        ];
}

function all(yamlData) {
  return Curry._1(IntMap$OptolithClient.fromList, Yaml_Zip$OptolithClient.zipBy(Int$OptolithClient.show, t, (function (x) {
                    return x.id;
                  }), (function (x) {
                    return x.id;
                  }), Json_decode.list(tUniv, yamlData.blessingsUniv), Json_decode.list(tL10n, yamlData.blessingsL10n)));
}

var Decode = {
  tL10n: tL10n,
  tUniv: tUniv,
  t: t,
  all: all
};

exports.Decode = Decode;
/* IntMap-OptolithClient Not a pure module */
