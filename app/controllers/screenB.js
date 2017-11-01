function openSubScreenB() {
    Alloy.Globals.windowStack.open(Alloy.createController('screenB').getView());
}

// Hide the Android action bar
function hideActionBar() {
    $.screenB.activity.actionBar.hide();
    $.toggleActionBarBtn.removeEventListener("click", hideActionBar);
    $.toggleActionBarBtn.addEventListener("click", showActionBar);
    $.toggleActionBarBtn.setTitle('Show action bar');
}

// Show the Android action bar
function showActionBar() {
    $.screenB.activity.actionBar.show();
    $.toggleActionBarBtn.removeEventListener("click", showActionBar);
    $.toggleActionBarBtn.addEventListener("click", hideActionBar);
    $.toggleActionBarBtn.setTitle('Hide action bar');
}

function changeTestFunc(e) {
    console.log(e);
    console.log($.changeTest.getValue());
}

// Show the logo on the action bar
function showActionBarLogo() {
    $.screenB.activity.actionBar.setLogo('logo.png');
}

// Show the home button and set onClick action
function showHomeButton() {
    $.screenB.activity.actionBar.setDisplayHomeAsUp(true);
    $.toggleHomeBtn.removeEventListener("click", showHomeButton);
    $.toggleHomeBtn.addEventListener("click", hideHomeButton);
    $.toggleHomeBtn.setTitle('Show home button');
}

// Show the home button and set onClick action
function hideHomeButton() {
    $.screenB.activity.actionBar.setDisplayHomeAsUp(false);
    $.toggleHomeBtn.removeEventListener("click", hideHomeButton);
    $.toggleHomeBtn.addEventListener("click", showHomeButton);
    $.toggleHomeBtn.setTitle('Show home button');
}

// Show / hide the controls once the view is open
$.getView().addEventListener("open", function () {
    if (Alloy.Globals.windowStack.isNotRootLevel()) {
        $.controls.show();
    } else {
        $.controls.hide();
    }
    $.stackSize.setText("Stack size: " + Alloy.Globals.windowStack.getSize());
});

//Fill the sagepay webform
function fillForm(e) {
    console.log('fill form');
    //e.source.setMask(e);
    // console.log($.cardNumber.getValue()
    //     // .replace(/\D/g, '')
    //     // .replace(/\s/g, '')
    // );
    // var values = {
    //     'cardholder-name': $.cardName.getValue(),
    //     'card-number': $.cardNumber.getValue()
    //         .replace(/\D/g, '')
    //         .replace(/\s/g, ''),
    //     'expiry-date': $.expiry.getValue()
    //         .replace(/\D/g, '')
    //         .replace(/\s/g, ''),
    //     'security-code': $.cvv.getValue()
    //         .replace(/\D/g, '')
    //         .replace(/\s/g, '')
    // };

    //  $.webView.evalJS('fillForm(' + JSON.stringify(values) + ')');
}
