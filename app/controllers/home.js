function openScreenB() {
    Alloy.Globals.windowStack.open(Alloy.createController('screenB').getView());
}

$.getView().addEventListener("ti-window-stack:sizechanged", function () {
    $.stackSize.setText("Stack size: " + Alloy.Globals.windowStack.getSize());
});
