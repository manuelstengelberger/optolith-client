// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as React from "react";
import * as Ley_List$OptolithClient from "../../../Data/Ley_List.bs.js";
import * as Ley_Option$OptolithClient from "../../../Data/Ley_Option.bs.js";
import * as ReactUtils$OptolithClient from "../../../Utilities/ReactUtils.bs.js";

function Label(Props) {
  var name = Props.name;
  var labelText = Props.labelText;
  return ReactUtils$OptolithClient.optionR((function (str) {
                return React.createElement("label", {
                            htmlFor: name
                          }, ReactUtils$OptolithClient.s(str));
              }), Ley_Option$OptolithClient.ensure(Ley_List$OptolithClient.Extra.notNullStr, labelText));
}

var make = Label;

export {
  make ,
  
}
/* react Not a pure module */
