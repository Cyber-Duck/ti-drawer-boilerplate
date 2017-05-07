function openScreenA() {
    Alloy.Globals.windowStack.open(Alloy.createController('screenA').getView());
}

$.home.addEventListener("open", function(){
    $.stackSize.setText("Stack size: " + Alloy.Globals.windowStack.size());
});

var navButton = Ti.UI.createButton({ title: 'Menu' });
navButton.addEventListener('click', function(){
    Alloy.Globals.drawer.toggleLeftWindow();
});
$.home.LeftNavButton = navButton;
