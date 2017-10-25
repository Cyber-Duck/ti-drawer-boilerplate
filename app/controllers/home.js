var TiTouchId = require('ti.touchid');

function openScreenB() {
    Alloy.Globals.windowStack.open(Alloy.createController('screenB').getView());
}

$.getView().addEventListener("ti-window-stack:sizechanged", function () {
    $.stackSize.setText("Stack size: " + Alloy.Globals.windowStack.getSize());
});

function authenticate(){
    if (!TiTouchId.isSupported()) {
        console.log("Touch ID is not supported on this device!");
        return;
    }

    TiTouchId.authenticate({
        reason: "Need to modify personal settings.",
        callback: function(e) {
            if (!e.success) {
                alert('Message: ' + e.error);

            } else {
                alert('YAY! success');
            }
        }
    });
};
