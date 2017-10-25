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

// Show the logo on the action bar
function showActionBarLogo() {
    $.screenB.activity.actionBar.setLogo('logo.png');
}

// Show the home button and set onClick action
function showHomeButton() {
    $.screenB.activity.actionBar.setDisplayHomeAsUp(true);
    $.screenB.activity.actionBar.setOnHomeIconItemSelected(goBack);
}

// Close the current window
function goBack() {
    Alloy.Globals.windowStack.back();
}

// Show / hide the controls once the view is open
$.getView().addEventListener("open", function () {
    if (Alloy.Globals.windowStack.isNotRootLevel()) {
        showHomeButton();
        $.controls.show();
    } else {
        $.controls.hide();
    }
    $.stackSize.setText("Stack size: " + Alloy.Globals.windowStack.getSize());
});
