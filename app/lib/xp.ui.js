exports.createWindow = function(args)
{
    var forceWindowAndroid = args.forceWindowAndroid || false;

    var win = Ti.UI[(OS_IOS || forceWindowAndroid) ? 'createWindow' : 'createView'](args);

    if (OS_IOS) {
        win.addEventListener('open', function(e){
            if (Alloy.Globals.windowStack.size() == 0) {
                Alloy.Globals.drawer.setOpenDrawerGestureMode("OPEN_MODE_ALL");
                Alloy.Globals.drawer.setCloseDrawerGestureMode("CLOSE_MODE_ALL");
            } else {
                Alloy.Globals.drawer.setOpenDrawerGestureMode("OPEN_MODE_NONE");
                Alloy.Globals.drawer.setCloseDrawerGestureMode("CLOSE_MODE_NONE");
            }
        });
        win.addEventListener('close', function(e){
            if (Alloy.Globals.windowStack.size() > 1) {
                Alloy.Globals.drawer.setOpenDrawerGestureMode("OPEN_MODE_NONE");
                Alloy.Globals.drawer.setCloseDrawerGestureMode("CLOSE_MODE_NONE");
            } else {
                Alloy.Globals.drawer.setOpenDrawerGestureMode("OPEN_MODE_ALL");
                Alloy.Globals.drawer.setCloseDrawerGestureMode("CLOSE_MODE_ALL");
            }
        });
    }

    return win;
};
