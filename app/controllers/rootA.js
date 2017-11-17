function openSubScreenA() {
    Alloy.Globals.windowStack.open(
        Alloy.createController('subScreenA').getView()
    );
}

function openModalA() {
    Alloy.createController('modalA').getView().open();
}

$.getView().addEventListener("ti-window-stack:sizechanged", function () {
    $.stackSize.setText("Stack size: " + Alloy.Globals.windowStack.getSize());
});
