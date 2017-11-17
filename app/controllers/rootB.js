function openSubScreenA() {
    Alloy.Globals.windowStack.open(
        Alloy.createController('subScreenA').getView()
    );
}

$.getView().addEventListener("open", function () {
    if (Alloy.Globals.windowStack.isNotRootLevel()) {
        $.controls.show();
    } else {
        $.controls.hide();
    }
    $.stackSize.setText("Stack size: " + Alloy.Globals.windowStack.getSize());
});
