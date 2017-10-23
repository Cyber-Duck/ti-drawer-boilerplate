exports.createWindow = function(args)
{
    var forceWindowAndroid = args.forceWindowAndroid || false;

    var window = Ti.UI[(OS_IOS || forceWindowAndroid) ? 'createWindow' : 'createView'](args);

    if (OS_IOS && Alloy.Globals.windowStack) {
        window.addEventListener('ti-window-stack:sizechanged', toggleMenuButton);
        window.addEventListener('ti-window-stack:sizechanged', toggleSwipe);
    }

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
