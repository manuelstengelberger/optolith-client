// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_obj from "bs-platform/lib/es6/caml_obj.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Ley_List$OptolithClient from "../../../Data/Ley_List.bs.js";
import * as ClassNames$OptolithClient from "../../../Utilities/ClassNames.bs.js";
import * as Ley_Option$OptolithClient from "../../../Data/Ley_Option.bs.js";

function SegmentedControls$Item(Props) {
  var active = Props.active;
  var groupName = Props.groupName;
  var name = Props.name;
  var label = Props.label;
  var value = Props.value;
  var disabled = Props.disabled;
  var onClick = Props.onClick;
  var onClickSafe = Props.onClickSafe;
  var handleClick = React.useCallback((function (param) {
          Curry._1(onClick, value);
          if (value !== undefined) {
            return Curry._1(onClickSafe, Caml_option.valFromOption(value));
          }
          
        }), [value]);
  var isActive = Caml_obj.caml_equal(active, value);
  var combinedName = groupName + ("-" + name);
  return React.createElement("li", {
              className: ClassNames$OptolithClient.fold({
                    hd: "segmented-controls-list-item",
                    tl: {
                      hd: ClassNames$OptolithClient.cond("active", isActive),
                      tl: {
                        hd: ClassNames$OptolithClient.cond("disabled", disabled),
                        tl: /* [] */0
                      }
                    }
                  })
            }, React.createElement("input", {
                  id: combinedName,
                  checked: isActive,
                  disabled: disabled,
                  name: groupName,
                  type: "radio",
                  onClick: handleClick
                }), React.createElement("label", {
                  htmlFor: combinedName
                }, label));
}

var Item = {
  make: SegmentedControls$Item
};

function SegmentedControls(Props) {
  var active = Props.active;
  var name = Props.name;
  var options = Props.options;
  var disabledOpt = Props.disabled;
  var label = Props.label;
  var onClick = Props.onClick;
  var onClickSafe = Props.onClickSafe;
  var disabled = disabledOpt !== undefined ? disabledOpt : false;
  return React.createElement("div", {
              className: ClassNames$OptolithClient.fold({
                    hd: "segmented-controls",
                    tl: {
                      hd: ClassNames$OptolithClient.cond("disabled", disabled),
                      tl: /* [] */0
                    }
                  })
            }, Ley_Option$OptolithClient.option(null, (function (str) {
                    return React.createElement("label", undefined, str);
                  }), label), React.createElement("ul", {
                  className: "segmented-controls-list"
                }, Ley_List$OptolithClient.listToArray(Ley_List$OptolithClient.map((function (option) {
                            return React.createElement(SegmentedControls$Item, {
                                        active: active,
                                        groupName: name,
                                        name: option.name,
                                        label: option.label,
                                        value: option.value,
                                        disabled: disabled || option.disabled,
                                        onClick: onClick,
                                        onClickSafe: onClickSafe
                                      });
                          }), options))));
}

var make = SegmentedControls;

export {
  Item ,
  make ,
  
}
/* react Not a pure module */
