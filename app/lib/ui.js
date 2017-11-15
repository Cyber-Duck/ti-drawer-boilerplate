// // <CreditCard />
// exports.createCreditCard = function(args) {

//     // create a wrapper
//     var wrapper = Ti.UI.createView(args);

//     // apply some overrides
//     wrapper.applyProperties({
//         width: args.width,
//         left: args.left || 0,
//         right: args.right,
//         height: Ti.UI.SIZE,
//         top: args.top,
//         bottom: args.bottom,
//         layout: "vertical",
//         touchEnabled: args.selectable === false ? false : true
//     });

//     // clear some properties for later
//     args.top = null;
//     args.left = null;
//     args.right = null;
//     args.bottom = null;

//     wrapper.backgroundColor = null;
//     wrapper.selected = false;

//     // if we have a caption, create it
//     if (args.caption) {
//         var captionWrapper = Ti.UI.createView({
//             layout: "horizontal",
//             left: 0,
//             width: Ti.UI.SIZE,
//             height: Ti.UI.SIZE,
//             bottom: 5,
//             touchEnabled: false
//         });

//         var caption = Ti.UI.createLabel({
//             text: args.caption,
//             top: 0,
//             left: 0,
//             right: 5,
//             width: Ti.UI.SIZE,
//             height: Ti.UI.SIZE,
//             font: args.captionStyle.font,
//             color: "#000",
//             touchEnabled: false
//         });

//         captionWrapper.add(caption);

//         wrapper.add(captionWrapper);

//         captionWrapper = null;
//     }

//     // create the control wrapper
//     var controlWrapper = Ti.UI.createView({
//         width: Ti.UI.FILL,
//         height: args.height,
//         left: 0,
//         top: 0,
//         borderRadius: 0,
//         borderColor: "#ccc",
//         backgroundColor: "#fff",
//         borderWidth: 1
//     });

//     // set the icon
//     var icon = Ti.UI.createImageView({
//         image: args.icon,
//         width: 35,
//         left: 10,
//         touchEnabled: false
//     });

//     // card details
//     var cardDetails = Ti.UI.createLabel({
//         layout: "vertical",
//         left: 55,
//         touchEnabled: false
//     });

//     // card no.
//     var cardNo = Ti.UI.createLabel({
//         text: "Ending " + args.number,
//         width: Ti.UI.SIZE,
//         height: Ti.UI.SIZE,
//         font: args.cardNoFont,
//         left: 0,
//         right: 10,
//         touchEnabled: false
//     });

//     controlWrapper.getCardIdentifier = function() {
//         return args.card_identifier;
//     };

//     // card expiry
//     var cardExpiry = Ti.UI.createLabel({
//         text: "Expiry " + args.expiry,
//         width: Ti.UI.SIZE,
//         height: Ti.UI.SIZE,
//         font: args.cardExpiryFont,
//         left: 0,
//         right: 10,
//         touchEnabled: false
//     });

//     if (args.selectedIcon) {
//         var selectedIcon = Ti.UI.createImageView({
//             image: args.selectedIcon,
//             right: 10,
//             touchEnabled: false,
//             visible: args.selected || false
//         });

//         controlWrapper.addEventListener("click", function() {
//             wrapper.setSelected(!wrapper.selected);
//         });

//         wrapper.setSelected = function(value) {
//             wrapper.selected = value;
//             if (selectedIcon) {
//                 selectedIcon.visible = value;
//             }
//             controlWrapper.setBackgroundColor(value ? "#f6f6f6" : "#fff");
//             wrapper.fireEvent("selected", {
//                 selected: value
//             });
//         };

//         wrapper.setSelected(args.selected || false);

//         controlWrapper.add(selectedIcon);
//     }

//     // add to the wrapper
//     cardDetails.add(cardNo);
//     cardDetails.add(cardExpiry);

//     controlWrapper.add(icon);
//     controlWrapper.add(cardDetails);

//     wrapper.add(controlWrapper);

//     return wrapper;
// };

// <TextField />
// exports.createTextField = function(args) {

//     // create a wrapper view for everything
//     var controlWrapper = Ti.UI.createView({
//         layout: "vertical",
//         width: args.width,
//         height: Ti.UI.SIZE,
//         left: args.left,
//         right: args.right,
//         top: args.top,
//         bottom: args.bottom,
//         caption: args.caption,
//         subText: args.subText
//     });

//     // need to clear some args or it messes with stuff later
//     args.top = null;
//     args.left = null;
//     args.right = null;
//     args.bottom = null;
//     args.backgroundColor = null;

//     args.disableKeyboardToolbar = args.disableKeyboardToolbar || false;

//     var controlBorderWrapper = Ti.UI.createView({
//         height: Ti.UI.SIZE,
//         width: Ti.UI.SIZE,
//         layout: "horizontal",
//         left: 0,
//         top: 5,
//     });

//     // wrapper for the textField itself
//     var controlBorder = Ti.UI.createView({
//         width: args.controlWidth || args.width,
//         height: args.height || 35,
//         left: 0,
//         top: 0,
//         borderRadius: args.borderRadius || 0,
//         borderColor: args.borderColor || "#CCC",
//         borderWidth: args.borderWidth || 1,
//     });

//     controlBorderWrapper.add(controlBorder);

//     if (args.rightControl) {
//         var control = exports["create" + args.rightControl.type] ? exports["create" + args.rightControl.type](args.rightControl.args) : Ti.UI["create" + args.rightControl.type](args.rightControl.args);
//         control.left = 10;
//         controlBorderWrapper.add(control);
//     }

//     // do we have a caption specified -- if so create it
//     if (args.caption) {
//         // we need a wrapper in case there's a tooltip icon specified
//         var captionWrapper = Ti.UI.createView({
//             top: 0,
//             layout: "horizontal",
//             left: 0,
//             width: Ti.UI.FILL,
//             height: Ti.UI.SIZE,
//         });

//         var caption = Ti.UI.createLabel({
//             text: args.caption,
//             top: 0 || args.captionStyle.top,
//             left: 0 || args.captionStyle.left,
//             right: 5 || args.captionStyle.right,
//             width: Ti.UI.SIZE,
//             height: Ti.UI.SIZE,
//             font: args.captionStyle && args.captionStyle.font || {
//                 fontSize: 13,
//                 fontWeight: "bold"
//             },
//             color: args.captionStyle && args.captionStyle.color || "#000",
//         });

//         captionWrapper.add(caption);

//         controlWrapper.add(captionWrapper);
//     }

//     controlWrapper.add(controlBorderWrapper);

//     // now let's create the textfield, using the args specified
//     if (args.multiline) {
//         var textField = Ti.UI.createTextArea(_.extend(args, {
//             height: Ti.UI.SIZE,
//             bottom: 20,
//             scrollable: false,
//         }));
//         controlBorder.setHeight(Ti.UI.SIZE);
//         controlWrapper.setHeight(Ti.UI.SIZE);
//     } else {
//         var textField = Ti.UI.createTextField(args);
//     }

//     if (args.controlWidth) {
//         textField.setWidth(args.controlWidth);
//     }

//     if (textField.getTouchEnabled() === false) {
//         controlBorder.setBackgroundColor("#f6f6f6");
//     }

//     // adjust left and right for indents
//     textField.left = 10;
//     textField.right = 10;

//     // remove any border attributes picked up
//     textField.borderColor = null;
//     textField.borderRadius = null;
//     textField.borderWidth = null;

//     if (_.has(args, "keyboard")) {
//         if (args.keyboard.toLowerCase() === 'decimal' || args.keyboard.toLowerCase() === 'phone') {
//             if (args.disableKeyboardToolbar) {
//                 textField.keyboardAppearance = Ti.UI.KEYBOARD_APPEARANCE_DARK;
//             } else {
//                 var done = Ti.UI.createButton({
//                     title: 'Done',
//                     //   style: Ti.UI.iOS.SystemButtonStyle.DONE,
//                 });
//                 done.addEventListener('click', function(e) {
//                     textField.blur();
//                     controlWrapper.fireEvent("done", _.extend(e, {
//                         value: textField.getValue()
//                     }));
//                 });
//                 // textField.keyboardToolbar = [Ti.UI.createButton({
//                 //     systemButton: Ti.UI.iOS.SystemButton.FLEXIBLE_SPACE
//                 // }), done];
//                 textField.keyboardToolbarColor = '#F6F6F6';
//                 textField.keyboardToolbarHeight = 40;
//             }
//         }
//         if (args.keyboard.toLowerCase() === 'decimal') {
//             textField.keyboardType = Ti.UI.KEYBOARD_TYPE_DECIMAL_PAD;
//         }
//         if (args.keyboard.toLowerCase() === 'phone') {
//             textField.keyboardType = Ti.UI.KEYBOARD_TYPE_PHONE_PAD;
//         }
//         if (args.keyboard.toLowerCase() === 'email') {
//             textField.keyboardType = Ti.UI.KEYBOARD_TYPE_EMAIL;
//         }
//     }

//     // if there's a left icon, create it
//     if (args.leftIcon) {
//         textField.left = 50;
//         var leftIconWrapper = Ti.UI.createView({
//             height: Ti.UI.FILL,
//             left: 0,
//             width: args.leftIcon.backgroundWidth || 40,
//             backgroundColor: args.leftIcon.backgroundColor || Alloy.CFG.colors.primary
//         });
//         controlBorder.add(leftIconWrapper);
//         if (args.leftIcon.image) {
//             leftIconWrapper.add(Ti.UI.createImageView({
//                 image: args.leftIcon.image
//             }));
//         }
//     }

//     // if there's a right icon, create it
//     if (args.rightIcon) {
//         textField.right = 50;
//         var rightIconWrapper = Ti.UI.createView({
//             height: Ti.UI.FILL,
//             right: 0,
//             width: args.rightIcon.backgroundWidth || 40,
//             backgroundColor: args.rightIcon.backgroundColor || Alloy.CFG.colors.primary
//         });
//         controlBorder.add(rightIconWrapper);
//         if (args.rightIcon.image) {
//             rightIconWrapper.add(Ti.UI.createImageView({
//                 image: args.rightIcon.image
//             }));
//         } else if (args.rightIcon.helpIcon) {
//             rightIconWrapper.add(Ti.UI.createLabel({
//                 font: {
//                     fontFamily: "Ionicons",
//                     fontSize: 18,
//                 },
//                 color: "#fff",
//                 width: args.rightIcon.backgroundWidth || 40,
//                 height: Ti.UI.FILL,
//                 backgroundColor: args.rightIcon.backgroundColor || Alloy.CFG.colors.primary,
//                 text: "\uf143",
//                 title: "\uf143",
//                 textAlign: "center",
//             }));
//         }
//         if (args.rightIcon.help) {
//             rightIconWrapper.addEventListener('click', function() {
//                 Alloy.App.trigger("help:show", {
//                     "image": args.rightIcon.help.image || false,
//                     "title": args.rightIcon.help.title || false
//                 });
//             });
//         }
//     }

//     controlBorder.add(textField);

//     // do we have a subText specified -- if so create it
//     if (args.subText) {
//         // we need a wrapper in case there's a tooltip icon specified
//         var subTextWrapper = Ti.UI.createView({
//             layout: "horizontal",
//             left: 0,
//             width: Ti.UI.SIZE,
//             height: Ti.UI.SIZE,
//             bottom: 5
//         });

//         var subText = Ti.UI.createLabel({
//             text: args.subText,
//             top: 5,
//             left: 0,
//             right: 5,
//             width: Ti.UI.SIZE,
//             height: Ti.UI.SIZE,
//             font: args.subTextStyle && args.subTextStyle.font || {
//                 fontSize: 10
//             },
//             color: args.subTextStyle && args.subTextStyle.color || "#000",
//         });

//         subTextWrapper.add(subText);
//         controlWrapper.add(subTextWrapper);
//     }

//     if (args.mask) {
//         var mask = false,
//             maskOptions = {},
//             StringFormatValidation = require("string-format-validation");
//         switch (args.mask) {
//             case "amount":
//                 mask = "###,###.##";
//                 maskOptions = {
//                     reverse: true
//                 };
//             case "bank-account-number":
//                 mask = "#### ####";
//                 break;
//             case "bank-account-sort-code":
//                 mask = "##-##-##";
//                 break;
//             case "card-number":
//                 mask = "#### #### #### ####";
//                 break;
//             case "card-expiry":
//                 mask = "##/##";
//                 break;
//             case "card-cvv":
//                 mask = "####";
//                 break;
//             case "phone-uk":
//                 mask = "##### ### ###";
//                 break;
//         }

//         if (mask) {
//             var textMask = function(e) {
//                 var value = e.source.getValue();
//                 var maskedValue = StringFormatValidation.format(mask, value, maskOptions);
//                 e.source.setValue(maskedValue);
//                 textField.setSelection(maskedValue.length, maskedValue.length);
//             };

//             var throttled = _.debounce(textMask, 100, true);

//             textField.addEventListener("change", throttled);

//         }
//     }

//     // couple of helpers to get / set value
//     controlWrapper.setValue = function(value) {
//         textField.setValue(value);
//     };

//     controlWrapper.getValue = function() {
//         return textField.getValue();
//     };

//     controlWrapper.blur = function() {
//         textField.blur();
//     };

//     controlWrapper.focus = function() {
//         textField.focus();
//     };

//     controlWrapper.setTouchEnabled = function(touchEnabled) {
//         controlWrapper.touchEnabled = touchEnabled;
//         if (touchEnabled) {
//             controlBorder.setBackgroundColor("#fff");
//         } else {
//             controlBorder.setBackgroundColor("#f6f6f6");
//         }
//     };

//     // error handling
//     var errorCaption;

//     // shows an error
//     controlWrapper.showError = function(message) {

//         // check if we haven't got one already
//         if (!errorCaption) {

//             // set the border properties and text colors
//             controlBorder.borderColor = "#F00";

//             if (caption) {
//                 caption.color = "#F00";
//             }

//             // create the caption
//             errorCaption = Ti.UI.createLabel({
//                 text: message,
//                 left: args.errorStyle && args.errorStyle.right || 2,
//                 right: args.errorStyle && args.errorStyle.right || 1,
//                 top: 2,
//                 color: args.errorStyle && args.errorStyle.color || "#F00",
//                 font: args.errorStyle && args.errorStyle.font,
//                 width: Ti.UI.SIZE,
//                 height: Ti.UI.SIZE
//             });

//             textField.addEventListener("change", function change() {
//                 textField.removeEventListener("change", change);
//                 controlWrapper.hideError();
//             });

//             // and add it to the wrapper
//             controlWrapper.add(errorCaption);
//         }
//     };

//     controlWrapper.hideError = function() {
//         // remove the caption
//         controlWrapper.remove(errorCaption);
//         // restore colours
//         if (caption) {
//             caption.color = args.captionStyle.color;
//         }
//         controlBorder.borderColor = args.borderColor;
//         // destroy
//         errorCaption = null;
//     };

//     return controlWrapper;
// };

// // <PickerField />
// exports.createPickerField = function(args) {

//     var pickerHeight = 260;
//     var controlWrapper = Ti.UI.createView({
//         layout: "vertical",
//         width: args.width,
//         height: Ti.UI.SIZE,
//         left: args.left,
//         right: args.right,
//         top: args.top,
//         bottom: args.bottom,
//         caption: args.caption,
//         subText: args.subText,
//     });

//     if (args.type && args.type === Ti.UI.PICKER_TYPE_DATE) {
//         controlWrapper.fromDate = args.fromDate || null;
//         controlWrapper.toDate = args.toDate || null;
//     }

//     args.top = null;
//     args.left = null;
//     args.right = null;
//     args.bottom = null;
//     args.backgroundColor = null;

//     var controlBorder = Ti.UI.createView({
//         width: args.width,
//         height: args.height,
//         left: 0,
//         borderRadius: 0,
//         borderColor: args.borderColor || "#DBDBDB",
//         borderWidth: args.borderWidth || 1
//     });

//     args.borderColor = null;
//     args.borderWidth = null;

//     if (args.caption) {
//         var captionWrapper = Ti.UI.createView({
//             layout: "horizontal",
//             left: 0,
//             bottom: 5,
//             width: Ti.UI.SIZE,
//             height: Ti.UI.SIZE,
//         });

//         var caption = Ti.UI.createLabel({
//             text: args.caption,
//             top: 0 || args.captionStyle.top,
//             left: 0 || args.captionStyle.left,
//             right: 5 || args.captionStyle.right,
//             width: Ti.UI.SIZE,
//             height: Ti.UI.SIZE,
//             font: args.captionStyle.font,
//             color: "#000"
//         });

//         captionWrapper.add(caption);

//         controlWrapper.add(captionWrapper);
//     }

//     var picker = Ti.UI.createView(args);
//     picker.active = false;
//     picker.value = false;

//     var hintText = Ti.UI.createLabel({
//         text: args.hintText || "",
//         left: 0,
//         width: Ti.UI.FILL,
//         color: "#BBB",
//         font: args.font
//     });
//     picker.add(hintText);

//     if (args.rightIcon) {
//         var rightIcon = Ti.UI.createImageView({
//             image: args.rightIcon,
//             right: 5
//         });

//         picker.add(rightIcon);
//     }

//     picker.addEventListener("click", function(e) {

//         if (picker.active) {
//             return;
//         }

//         var pickerWindow = Ti.UI.createWindow({
//             backgroundColor: "#fff",
//             height: pickerHeight,
//             top: Alloy.Globals.device.height - 1,
//             layout: "vertical",
//         });

//         if (args.fullscreen) {
//             pickerWindow.setTop(0);
//             pickerWindow.setHeight(Ti.UI.FILL);
//             pickerWindow.setModal(true);
//             pickerWindow.setBackgroundColor("#fff");
//             pickerWindow.add(Ti.UI.createView({
//                 top: 0,
//                 width: Ti.UI.FILL,
//                 height: 20,
//                 backgroundColor: Alloy.CFG.colors.primary
//             }));
//         }

//         var titleBar = Ti.UI.createView({
//             height: 45,
//             top: 0,
//             backgroundColor: "#F5F5F5",
//             width: Ti.UI.FILL,
//         });

//         var topBorder = Ti.UI.createView({
//             height: 1,
//             top: 0,
//             backgroundColor: "#DBDBDB",
//         });

//         var title = Ti.UI.createLabel({
//             text: (args.title && args.title.text) || "",
//             font: args.title && args.title.font
//         });

//         var done = Ti.UI.createButton({
//             title: (args.done && args.done.text) || "Done",
//             right: 8,
//             font: (args.done && args.done.font) || {
//                 fontSize: 17,
//                 fontWeight: "bold"
//             }
//         });

//         var cancel = Ti.UI.createButton({
//             title: (args.cancel && args.cancel.text) || "Cancel",
//             left: 8,
//             font: (args.cancel && args.cancel.font) || {
//                 fontSize: 17,
//                 fontWeight: "bold"
//             }
//         });

//         titleBar.add(topBorder);
//         titleBar.add(done);
//         titleBar.add(title);
//         titleBar.add(cancel);

//         pickerWindow.add(titleBar);

//         var pickerControl = Ti.UI.createPicker({
//             width: Ti.UI.FILL,
//             height: Ti.UI.SIZE,
//             type: args.type || Ti.UI.PICKER_TYPE_PLAIN
//         });

//         // if we have a custom picker view, replace it
//         if (args.pickerView) {
//             pickerControl = Alloy.createController(args.pickerView)
//                 .getView();
//         }
//         if (args.fullscreen) {
//             pickerControl.setHeight(Ti.UI.FILL);
//         }
//         if (picker.value) {
//             if (pickerControl.getType() === Ti.UI.PICKER_TYPE_PLAIN) {
//                 pickerControl.setSelectedRow(0, picker.value, false);
//             } else {
//                 pickerControl.setValue(picker.value);
//             }
//         }
//         if (pickerControl.getType() === Ti.UI.PICKER_TYPE_DATE) {
//             var moment = require("alloy/moment");
//             var parseplus = require("moment-parseplus")
//                 .addParser({
//                     name: 'firstlastdayof',
//                     matcher: /^(first|last) day of (last|this|next) (month|year)/i,
//                     handler: function(match) {
//                         var date = moment();
//                         switch (match[2].toLowerCase()) {
//                             case "last":
//                                 date = date.subtract(1, match[3].toLowerCase());
//                                 break;
//                             case "next":
//                                 date = date.add(1, match[3].toLowerCase());
//                                 break;
//                         }
//                         switch (match[1].toLowerCase()) {
//                             case "first":
//                                 return date.startOf(match[3].toLowerCase());
//                             case "last":
//                                 return date.endOf(match[3].toLowerCase());
//                         }
//                     }
//                 });
//             if (controlWrapper.fromDate) {
//                 var fromDate = parseplus.attemptToParse(controlWrapper.fromDate);
//                 if (!_.isUndefined(fromDate)) {
//                     pickerControl.setMinDate(fromDate);
//                 }
//             }
//             if (controlWrapper.toDate) {
//                 var toDate = parseplus.attemptToParse(controlWrapper.toDate);
//                 if (!_.isUndefined(toDate)) {
//                     pickerControl.setMaxDate(toDate);
//                 }
//             }
//         }

//         pickerWindow.add(pickerControl);

//         done.addEventListener("click", function doneClick() {
//             done.removeEventListener("click", doneClick);
//             controlWrapper.hideError();
//             if (pickerControl.getType() == Ti.UI.PICKER_TYPE_PLAIN) {
//                 var rows = pickerControl.getColumns()[0].getRows();
//                 var row = pickerControl.getSelectedRow(0);
//                 picker.value = _.indexOf(rows, row);
//             } else {
//                 picker.value = pickerControl.getValue();
//             }
//             picker.fireEvent("change", {
//                 picker: pickerControl
//             });
//             closePicker();
//         });

//         cancel.addEventListener("click", function cancelClick() {
//             cancel.removeEventListener("click", cancelClick);
//             closePicker();
//         });

//         if (args.fullscreen) {
//             pickerWindow.open({
//                 animated: true
//             });
//         } else {
//             pickerWindow.open({
//                 animated: false
//             });
//             pickerWindow.animate({
//                 top: Alloy.Globals.device.height - pickerHeight,
//                 duration: 300,
//             }, function() {
//                 picker.active = true;
//             });
//         }

//         function closePicker() {
//             if (args.fullscreen) {
//                 pickerWindow.close({
//                     animated: true
//                 });
//                 picker.active = false;
//                 _.delay(function() {
//                     pickerWindow = null;
//                 }, 500);
//             } else {
//                 pickerWindow.animate({
//                     top: Alloy.Globals.device.height,
//                     duration: 300,
//                 }, function() {
//                     pickerWindow.close({
//                         animated: false
//                     });
//                     pickerWindow = null;
//                     picker.active = false;
//                 });
//             }
//         }
//     });

//     picker.left = 10;
//     picker.right = 10;

//     controlWrapper.add(controlBorder);
//     controlBorder.add(picker);

//     // error handling
//     var errorCaption;

//     controlWrapper.setValue = function(value) {
//         hintText.setText(value);
//         hintText.setColor("#000");
//     };

//     controlWrapper.getValue = function() {
//         if (args.hintText) {
//             return hintText.getText() !== args.hintText ? hintText.getText() : "";
//         } else {
//             return hintText.getText();
//         }
//     };

//     // shows an error
//     controlWrapper.showError = function(message) {

//         // check if we haven't got one already
//         if (!errorCaption) {

//             // set the border properties and text colors
//             controlBorder.borderColor = "#F00";

//             if (caption) {
//                 caption.color = "#F00";
//             }

//             // create the caption
//             errorCaption = Ti.UI.createLabel({
//                 text: message,
//                 left: 0,
//                 top: 2,
//                 color: args.errorStyle && args.errorStyle.color || "#F00",
//                 font: args.errorStyle && args.errorStyle.font,
//                 width: Ti.UI.SIZE,
//                 height: Ti.UI.SIZE
//             });

//             // and add it to the wrapper
//             controlWrapper.add(errorCaption);
//         }
//     };

//     controlWrapper.hideError = function() {
//         // remove the caption
//         controlWrapper.remove(errorCaption);
//         // restore colours
//         if (caption) {
//             caption.color = args.captionStyle && args.captionStyle.color || "#000";
//         }
//         controlBorder.borderColor = "#CCC";
//         // destroy
//         errorCaption = null;
//     };

//     return controlWrapper;
// };

// // <PickerOverlay />
// exports.createPickerOverlay = function(args) {

//     var pickerHeight = 260;
//     var pickerOverlay = Ti.UI.createView();
//     pickerOverlay.active = false;

//     var pickerWindow = Ti.UI.createWindow({
//         backgroundColor: "#fff",
//         top: Alloy.Globals.device.height - 1,
//         layout: "vertical",
//     });
//     pickerOverlay.setData = function(data) {
//         if (pickerControl.getType() == Ti.UI.PICKER_TYPE_PLAIN && data) {
//             pickerControl.add(data);
//         }
//     };
//     pickerOverlay.open = function() {
//         pickerWindow.open();
//         pickerWindow.animate({
//             top: Alloy.Globals.device.height - pickerHeight,
//             duration: 300,
//         }, function() {
//             pickerOverlay.active = true;
//             pickerOverlay.fireEvent("open", {
//                 active: pickerOverlay.active
//             });
//         });
//     };
//     pickerOverlay.close = function() {
//         pickerWindow.animate({
//             top: Alloy.Globals.device.height,
//             duration: 300,
//         }, function() {
//             pickerWindow.close();
//             pickerWindow = null;
//             pickerOverlay.active = false;
//             pickerOverlay.fireEvent("close", {
//                 active: pickerOverlay.active
//             });
//         });
//     };

//     var titleBar = Ti.UI.createView({
//         height: 45,
//         backgroundColor: "#F5F5F5",
//         width: Ti.UI.FILL,
//         top: 0
//     });

//     var topBorder = Ti.UI.createView({
//         height: 1,
//         top: 0,
//         backgroundColor: "#DBDBDB",
//     });

//     var title = Ti.UI.createLabel({
//         text: (args.title && args.title.text) || "",
//         font: args.title && args.title.font
//     });

//     var done = Ti.UI.createButton({
//         title: (args.done && args.done.text) || "Done",
//         right: 8,
//         font: (args.done && args.done.font) || {
//             fontSize: 17,
//             fontWeight: "bold"
//         }
//     });

//     var cancel = Ti.UI.createButton({
//         title: (args.cancel && args.cancel.text) || "Cancel",
//         left: 8,
//         font: (args.cancel && args.cancel.font) || {
//             fontSize: 17,
//             fontWeight: "bold"
//         }
//     });

//     titleBar.add(topBorder);
//     titleBar.add(done);
//     titleBar.add(title);
//     titleBar.add(cancel);

//     pickerWindow.add(titleBar);

//     var pickerControl = Ti.UI.createPicker({
//         width: Ti.UI.FILL,
//         height: Ti.UI.SIZE,
//         type: args.type || Ti.UI.PICKER_TYPE_PLAIN
//     });
//     // if we have a custom picker view, replace it
//     if (args.pickerView) {
//         pickerControl = Alloy.createController(args.pickerView)
//             .getView();
//     }

//     if (pickerControl.getType() == Ti.UI.PICKER_TYPE_PLAIN && args.data) {
//         pickerOverlay.setData(args.data);
//     }

//     pickerWindow.add(pickerControl);

//     done.addEventListener("click", function doneClick() {
//         done.removeEventListener("click", doneClick);
//         pickerOverlay.fireEvent("change", {
//             picker: pickerControl
//         });
//         pickerOverlay.close();
//     });

//     cancel.addEventListener("click", function cancelClick() {
//         cancel.removeEventListener("click", cancelClick);
//         pickerOverlay.close();
//     });

//     return pickerOverlay;
// };

// // <TabbedBar />
// exports.createTabbedBar = function(args) {
//     var wrapper = Ti.UI.createView(args);

//     wrapper.applyProperties({
//         width: args.width,
//         left: args.left || 0,
//         right: args.right,
//         height: args.height || 45,
//         top: args.top,
//         bottom: args.bottom,
//         layout: "vertical"
//     });

//     args.top = null;
//     args.left = null;
//     args.right = null;
//     args.bottom = null;

//     wrapper.backgroundColor = null;

//     var controlWrapper = Ti.UI.createView({
//         width: args.width,
//         left: 0
//     });

//     if (args.caption) {
//         var captionWrapper = Ti.UI.createView({
//             layout: "horizontal",
//             left: 0,
//             bottom: 5,
//             width: Ti.UI.SIZE,
//             height: Ti.UI.SIZE,
//         });

//         var caption = Ti.UI.createLabel({
//             text: args.caption,
//             top: 0,
//             left: 0,
//             right: 5,
//             width: Ti.UI.SIZE,
//             height: Ti.UI.SIZE,
//             font: args.captionStyle.font || {
//                 fontSize: 12,
//                 fontWeight: "bold"
//             },
//             color: "#000"
//         });

//         captionWrapper.add(caption);

//         wrapper.add(captionWrapper);
//     }

//     var control = Ti.UI.iOS.createTabbedBar(args);

//     //control.backgroundColor = args.backgroundColor;

//     control.addEventListener("click", function clickControl(e) {
//         // Code goes here...
//     });

//     wrapper.add(controlWrapper);
//     controlWrapper.add(control);

//     wrapper.setValue = function(value) {
//         control.value = value;
//     };

//     wrapper.getValue = function() {
//         return control.value;
//     };

//     return wrapper;
// };

// // <Button />
// exports.createButton = function(args) {

//     var wrapper = Ti.UI.createView(args);

//     wrapper.applyProperties({
//         width: args.width,
//         height: args.height,
//         top: args.top,
//         left: args.left,
//         right: args.right,
//         bottom: args.bottom,
//     });

//     args.top = null;
//     args.left = null;
//     args.right = null;
//     args.bottom = null;

//     var button = Ti.UI.createView(args);

//     button.addEventListener("touchstart", function() {
//         if (args.selectedBackgroundColor) {
//             button.animate({
//                 backgroundColor: args.selectedBackgroundColor,
//                 duration: 150
//             });
//         } else {
//             wrapper.animate({
//                 opacity: 0.75,
//                 duration: 150
//             });
//         }
//     });

//     button.addEventListener("touchend", function() {
//         if (args.selectedBackgroundColor) {
//             button.animate({
//                 backgroundColor: args.backgroundColor,
//                 duration: 150
//             });
//         } else {
//             wrapper.animate({
//                 opacity: 1,
//                 duration: 150
//             });
//         }
//     });

//     button.addEventListener("touchcancel", function() {
//         if (args.selectedBackgroundColor) {
//             button.animate({
//                 backgroundColor: args.backgroundColor,
//                 duration: 150
//             });
//         } else {
//             wrapper.animate({
//                 opacity: 1,
//                 duration: 150
//             });
//         }
//     });

//     wrapper.add(button);

//     if (args.leftIcon) {
//         wrapper.add(Ti.UI.createImageView({
//             image: args.leftIcon,
//             left: 15,
//             top: button.top + button.rect.y + (button.height / 2) - 10,
//             touchEnabled: false
//         }));
//     }

//     if (args.rightIcon) {
//         var rightIcon = Ti.UI.createImageView({
//             image: args.rightIcon,
//             width: 30,
//             height: 30,
//             right: 15,
//             top: button.top + button.rect.y + (button.height / 2) - 15,
//             touchEnabled: false
//         });

//         wrapper.rightIcon = rightIcon;

//         wrapper.add(rightIcon);
//     }

//     var title = Ti.UI.createLabel({
//         width: Ti.UI.SIZE,
//         height: Ti.UI.SIZE,
//         top: args.top,
//         text: args.title || "",
//         font: args.font,
//         color: args.color,
//         touchEnabled: false,
//     });
//     switch (args.textAlign) {
//         case "left":
//             title.setLeft(15);
//             break;
//         case "right":
//             title.setRight(15);
//             break;
//     }
//     wrapper.add(title);

//     wrapper.setTitle = function(value) {
//         title.setText(value);
//     };

//     return wrapper;
// };

// <NavigationWindow />
exports.createNavigationWindow = function(args) {
    function navigationWindow(args) {
        this.open = function(options) {
            args.window.open();
        };
        this.openWindow = function(win) {
            win.open();
        };
        this.closeWindow = function(win) {
            win.close();
        };
    }

    if (OS_ANDROID) {
        return new navigationWindow(args);
    } else {
        return Ti.UI.iOS.createNavigationWindow(args);
    }
};

// // <Slider />
// exports.createSlider = function(args) {
//     var wrapper = Ti.UI.createView({
//         left: args.left,
//         right: args.right,
//         top: args.top,
//         bottom: args.bottom,
//         width: args.width,
//         height: args.height
//     });

//     args.top = null;
//     args.left = null;
//     args.right = null;
//     args.bottom = null;
//     args.width = null;
//     args.height = null;

//     if (!args.leftImage) {
//         var leftImage = Ti.UI.createLabel({
//             borderColor: args.tintColor || "#000",
//             borderWidth: 1,
//             borderRadius: 15,
//             width: 30,
//             height: 30,
//             left: 0,
//             text: "-",
//             color: args.tintColor,
//             font: {
//                 fontWeight: "bold",
//                 fontSize: 19
//             },
//             textAlign: "center",
//             backgroundColor: "#fff"
//         });

//         wrapper.add(leftImage);
//     }

//     if (!args.rightImage) {
//         var rightImage = Ti.UI.createLabel({
//             borderColor: args.tintColor || "#000",
//             borderWidth: 1,
//             borderRadius: 15,
//             width: 30,
//             height: 30,
//             right: 0,
//             text: "+",
//             color: args.tintColor,
//             font: {
//                 fontWeight: "bold",
//                 fontSize: 19
//             },
//             textAlign: "center",
//             backgroundColor: "#fff"
//         });

//         wrapper.add(rightImage);
//     }

//     var slider = Ti.UI.createSlider(args);

//     slider.left = 35;
//     slider.right = 35;

//     if (!args.thumbImage) {
//         var thumbImage = Ti.UI.createLabel({
//             borderColor: args.tintColor || "#000",
//             borderWidth: 1,
//             borderRadius: 18,
//             width: 36,
//             height: 36,
//             text: "< >",
//             font: {
//                 fontWeight: "normal",
//                 fontSize: 19
//             },
//             color: args.tintColor,
//             backgroundColor: "#fff",
//             textAlign: "center",
//         });

//         slider.thumbImage = thumbImage.toImage();
//     }

//     wrapper.add(slider);

//     slider.addEventListener("change", function(e) {
//         wrapper.fireEvent("change", e);
//     });

//     wrapper.setValue = function(value) {
//         slider.setValue(value);
//     };

//     return wrapper;
// };

// // <Balance />
// exports.createBalance = function(args) {

//     // create a wrapper
//     var wrapper = Ti.UI.createView(args);

//     // apply some overrides
//     wrapper.applyProperties({
//         width: args.width,
//         left: args.left || 0,
//         right: args.right || 0,
//         height: Ti.UI.SIZE,
//         top: args.top,
//         bottom: args.bottom,
//         layout: "auto",
//         backgroundColor: "#F5F6F8"
//     });

//     // clear some properties for later
//     args.top = null;
//     args.left = null;
//     args.right = null;
//     args.bottom = null;

//     // if we have a caption, create it
//     if (args.caption) {
//         var captionWrapper = Ti.UI.createView({
//             layout: "horizontal",
//             left: 0,
//             width: Ti.UI.SIZE,
//             height: Ti.UI.SIZE,
//             bottom: 5
//         });

//         var caption = Ti.UI.createLabel({
//             text: args.caption,
//             top: 0,
//             left: 0,
//             right: 5,
//             width: Ti.UI.SIZE,
//             height: Ti.UI.SIZE,
//             font: args.captionStyle.font,
//             color: "#000"
//         });

//         captionWrapper.add(caption);

//         wrapper.add(captionWrapper);

//         captionWrapper = null;
//     }

//     // create the control wrapper
//     var controlWrapper = Ti.UI.createView({
//         width: Ti.UI.SIZE,
//         layout: 'vertical',
//         height: Ti.UI.SIZE, //args.height,
//         left: 30,
//         right: 30,
//         top: 10,
//         bottom: 20,
//         borderRadius: 0,
//         borderColor: "#AAA",
//         backgroundColor: '#FFF',
//         borderWidth: 1
//     });

//     // Title
//     var title = Ti.UI.createLabel({
//         text: args.title || "Credit Acceptance Corporation",
//         width: Ti.UI.FILL,
//         height: Ti.UI.SIZE,
//         font: args.balFont || {
//             fontSize: 14,
//         },
//         top: 20,
//         color: '#005380',
//         textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
//     });

//     // Refence number
//     var ref = Ti.UI.createLabel({
//         text: 'Reference: ' + args.ref,
//         width: Ti.UI.FILL,
//         height: Ti.UI.SIZE,
//         top: 10,
//         font: args.balFont || {
//             fontSize: 12,
//         },
//         textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
//     });

//     // Balance number
//     var bal = Ti.UI.createLabel({
//         text: Alloy.Globals.string.formatCurrency(args.bal),
//         width: Ti.UI.FILL,
//         height: Ti.UI.SIZE,
//         top: 10,
//         font: args.balFont || {
//             fontSize: 14,
//         },
//         textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
//     });

//     // Date of last update
//     var update = Ti.UI.createLabel({
//         text: "Last updated " + args.update,
//         width: Ti.UI.FILL,
//         height: Ti.UI.SIZE,
//         top: 10,
//         bottom: 10,
//         font: args.balFont || {
//             fontSize: 8,
//             fontWeight: "bold"
//         },
//         textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
//     });

//     // add to the wrapper
//     controlWrapper.add(title);
//     controlWrapper.add(ref);
//     controlWrapper.add(bal);
//     controlWrapper.add(update);

//     wrapper.add(controlWrapper);

//     return wrapper;
// };
