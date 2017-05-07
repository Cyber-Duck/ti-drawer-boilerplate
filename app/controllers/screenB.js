function openSubScreenA() {
    Alloy.Globals.windowStack.open(Alloy.createController('screenA').getView());
}

$.getView().addEventListener("open", function(){
    $.stackSize.setText("Stack size: " + Alloy.Globals.windowStack.size());
    if (Alloy.Globals.windowStack.size() > 0) {
        $.controls.show();
    } else {
        $.controls.hide();
    }
    if (Alloy.Globals.windowStack.size() < 1) {
        var navButton = Ti.UI.createButton({ title: 'Menu' });
        navButton.addEventListener('click', function(){
            Alloy.Globals.drawer.toggleLeftWindow();
        });
        $.getView().LeftNavButton = navButton;
    }
});
