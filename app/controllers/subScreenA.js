function openSubScreenA() {
    Alloy.Globals.windowStack.open(
        Alloy.createController('subScreenA').getView()
    );
}

// Hide the Android action bar
function hideActionBar() {
    $.subScreenA.activity.actionBar.hide();
    $.toggleActionBarBtn.removeEventListener("click", hideActionBar);
    $.toggleActionBarBtn.addEventListener("click", showActionBar);
    $.toggleActionBarBtn.setTitle('Show action bar');
}

// Show the Android action bar
function showActionBar() {
    $.subScreenA.activity.actionBar.show();
    $.toggleActionBarBtn.removeEventListener("click", showActionBar);
    $.toggleActionBarBtn.addEventListener("click", hideActionBar);
    $.toggleActionBarBtn.setTitle('Hide action bar');
}

// Show the home button and set onClick action
function showHomeButton() {
    $.subScreenA.activity.actionBar.setDisplayHomeAsUp(true);
    $.toggleHomeBtn.removeEventListener("click", showHomeButton);
    $.toggleHomeBtn.addEventListener("click", hideHomeButton);
    $.toggleHomeBtn.setTitle('Show home button');
}

// Show the home button and set onClick action
function hideHomeButton() {
    $.subScreenA.activity.actionBar.setDisplayHomeAsUp(false);
    $.toggleHomeBtn.removeEventListener("click", hideHomeButton);
    $.toggleHomeBtn.addEventListener("click", showHomeButton);
    $.toggleHomeBtn.setTitle('Show home button');
}

// Show / hide the controls once the view is open
$.getView().addEventListener("ti-window-stack:sizechanged", function() {
    if (Alloy.Globals.windowStack.isNotRootLevel()) {
        $.controls.show();
    } else {
        $.controls.hide();
    }
    $.stackSize.setText("Stack size: " + Alloy.Globals.windowStack.getSize());
});
