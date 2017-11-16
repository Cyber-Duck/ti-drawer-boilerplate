function openSubScreenA() {
    Alloy.Globals.windowStack.open(Alloy.createController('subScreenA').getView());
}

$.getView().addEventListener("ti-window-stack:sizechanged", function () {
    $.stackSize.setText("Stack size: " + Alloy.Globals.windowStack.getSize());
});
