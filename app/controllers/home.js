function openScreenA() {
    Alloy.Globals.windowStack.open(Alloy.createController('screenA').getView());
}

$.getView().addEventListener("ti-window-stack:sizechanged", function () {
    $.stackSize.setText("Stack size: " + Alloy.Globals.windowStack.getSize());
});
