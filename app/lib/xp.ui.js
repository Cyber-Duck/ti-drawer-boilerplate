exports.createWindow = function(args)
{
    var forceWindowAndroid = args.forceWindowAndroid || false;

    var window = Ti.UI[(OS_IOS || forceWindowAndroid) ? 'createWindow' : 'createView'](args);

    if (OS_IOS && Alloy.Globals.windowStack) {
        window.addEventListener('ti-window-stack:sizechanged', toggleMenuButton);
        window.addEventListener('ti-window-stack:sizechanged', toggleSwipe);
    }

    // Show the home button and set onClick action
    function showHomeButton() {
        window._internalActivity.actionBar.setDisplayHomeAsUp(true);
        window._internalActivity.actionBar.setOnHomeIconItemSelected(goBack);
    }

    // Close the current window
    function goBack() {
        Alloy.Globals.windowStack.back();
    }

    // Show / hide the controls once the view is open
    window.addEventListener("open", function () {
        if (Alloy.Globals.windowStack.isNotRootLevel() && OS_ANDROID) {
            showHomeButton();
        }
    });

    return window;
};

var toggleMenuButton = function (e) {
    if (!Alloy.Globals.drawer || !Alloy.Globals.windowStack) {
        return;
    }
    if (Alloy.Globals.windowStack.isRootLevel()) {
        e.source.LeftNavButton = Alloy.createController("_menuButton").getView();
    }
};

var toggleSwipe = function () {
    if (!Alloy.Globals.drawer || !Alloy.Globals.windowStack) {
        return;
    }
    if (Alloy.Globals.windowStack.isRootLevel()) {
        Alloy.Globals.drawer.setOpenDrawerGestureMode("OPEN_MODE_ALL");
        Alloy.Globals.drawer.setCloseDrawerGestureMode("CLOSE_MODE_ALL");
    } else {
        Alloy.Globals.drawer.setOpenDrawerGestureMode("OPEN_MODE_NONE");
        Alloy.Globals.drawer.setCloseDrawerGestureMode("CLOSE_MODE_NONE");
    }
};
