function openSubScreenB() {
    Alloy.Globals.windowStack.open(Alloy.createController('screenB').getView());
}

// Hide the Android action bar
function hideActionBar() {
    $.screenB.activity.actionBar.hide();
}

// Show the Android action bar
function showActionBar() {
    $.screenB.activity.actionBar.show();
}

$.getView().addEventListener("open", function () {
    if (Alloy.Globals.windowStack.isNotRootLevel()) {

console.log('Not root');
        $.controls.show();
    } else {
console.log('At root');
        $.controls.hide();
    }
    $.stackSize.setText("Stack size: " + Alloy.Globals.windowStack.getSize());
});
