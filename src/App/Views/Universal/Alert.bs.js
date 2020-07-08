// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Overlay$OptolithClient from "./Overlay.bs.js";
import * as Ley_List$OptolithClient from "../../../Data/Ley_List.bs.js";
import * as TextField$OptolithClient from "./TextField.bs.js";
import * as ClassNames$OptolithClient from "../../../Utilities/ClassNames.bs.js";
import * as ReactUtils$OptolithClient from "../../../Utilities/ReactUtils.bs.js";

function Alert$Button(Props) {
  var label = Props.label;
  var value = Props.value;
  var primary = Props.primary;
  var onClick = Props.onClick;
  var handleClick = React.useCallback((function (param) {
          return Curry._1(onClick, value);
        }), [
        value,
        onClick
      ]);
  return React.createElement("button", {
              className: ClassNames$OptolithClient.fold({
                    hd: ClassNames$OptolithClient.cond("primary", primary),
                    tl: /* [] */0
                  }),
              type: "button",
              onClick: handleClick
            }, ReactUtils$OptolithClient.s(label));
}

var Button = {
  make: Alert$Button
};

function Alert$StringInput(Props) {
  var title = Props.title;
  var message = Props.message;
  var actionLabel = Props.actionLabel;
  var cancelLabel = Props.cancelLabel;
  var isOpen = Props.isOpen;
  var onClick = Props.onClick;
  var onClose = Props.onClose;
  var name = Props.name;
  var placeholder = Props.placeholder;
  var match = React.useState(function () {
        return "";
      });
  var setInput = match[1];
  var input = match[0];
  var handleSubmit = React.useCallback((function (param) {
          if (input.length > 0) {
            return Curry._1(onClick, input);
          }
          
        }), [
        input,
        onClick
      ]);
  var handleClick = React.useCallback((function (param) {
          if (input.length > 0) {
            return Curry._1(onClick, input);
          }
          
        }), [
        input,
        onClick
      ]);
  var handleInput = React.useCallback((function (input) {
          return Curry._1(setInput, (function (param) {
                        return input;
                      }));
        }), [setInput]);
  return React.createElement(Overlay$OptolithClient.make, {
              baseClassName: "alert",
              children: null,
              isOpen: isOpen,
              onBackdrop: onClose
            }, React.createElement("header", undefined, React.createElement("h2", undefined, ReactUtils$OptolithClient.s(title)), ReactUtils$OptolithClient.optionR((function (str) {
                        return React.createElement("p", undefined, ReactUtils$OptolithClient.s(str));
                      }), message)), React.createElement("form", {
                  onSubmit: handleSubmit
                }, React.createElement(TextField$OptolithClient.$$String.make, {
                      name: name,
                      value: input,
                      onChange: handleInput,
                      placeholder: placeholder
                    })), React.createElement("div", {
                  className: "buttons"
                }, React.createElement("button", {
                      className: "primary",
                      type: "button",
                      onClick: handleClick
                    }, ReactUtils$OptolithClient.s(actionLabel)), React.createElement("button", {
                      className: "primary",
                      type: "button",
                      onClick: onClose
                    }, ReactUtils$OptolithClient.s(cancelLabel))));
}

var StringInput = {
  make: Alert$StringInput
};

function Alert(Props) {
  var title = Props.title;
  var message = Props.message;
  var primaryButton = Props.primaryButton;
  var secondaryButtonsOpt = Props.secondaryButtons;
  var isOpen = Props.isOpen;
  var onClick = Props.onClick;
  var onClose = Props.onClose;
  var secondaryButtons = secondaryButtonsOpt !== undefined ? secondaryButtonsOpt : /* [] */0;
  return React.createElement(Overlay$OptolithClient.make, {
              baseClassName: "alert",
              className: ClassNames$OptolithClient.fold({
                    hd: ClassNames$OptolithClient.cond("alert-long", Ley_List$OptolithClient.Foldable.length(secondaryButtons) > 2),
                    tl: /* [] */0
                  }),
              children: null,
              isOpen: isOpen,
              onBackdrop: onClose
            }, React.createElement("header", undefined, React.createElement("h2", undefined, ReactUtils$OptolithClient.s(title)), ReactUtils$OptolithClient.optionR((function (str) {
                        return React.createElement("p", undefined, ReactUtils$OptolithClient.s(str));
                      }), message)), React.createElement("div", {
                  className: "buttons"
                }, React.createElement(Alert$Button, {
                      label: primaryButton.label,
                      value: primaryButton.value,
                      primary: true,
                      onClick: onClick
                    }), Ley_List$OptolithClient.listToArray(Ley_List$OptolithClient.map((function (button) {
                            return React.createElement(Alert$Button, {
                                        label: button.label,
                                        value: button.value,
                                        primary: false,
                                        onClick: onClick
                                      });
                          }), secondaryButtons))));
}

var make = Alert;

export {
  Button ,
  StringInput ,
  make ,
  
}
/* react Not a pure module */
