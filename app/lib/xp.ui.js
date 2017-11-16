if (OS_ANDROID) {
    var NavigationWindow = function (args) {
        this.args = args;
    };

    NavigationWindow.prototype.open = function (params) {
        params = params || {};
        params.displayHomeAsUp = false;
        return this.openWindow(this.args.window, params);
    };

    NavigationWindow.prototype.close = function (params) {
        return this.closeWindow(this.args.window, params);
    };

    NavigationWindow.prototype.openWindow = function (window, options) {
        var that = this;

        options = options || {};
        options.swipeBack = (typeof options.swipeBack === 'boolean') ? options.swipeBack : that.args.swipeBack;
        options.displayHomeAsUp = (typeof options.displayHomeAsUp === 'boolean') ? options.displayHomeAsUp : that.args.displayHomeAsUp;

        if (OS_ANDROID && options.animated !== false) {
            options.activityEnterAnimation = Ti.Android.R.anim.slide_in_left;
            options.activityExitAnimation = Ti.Android.R.anim.slide_out_right;
        }

        if (options.swipeBack !== false) {
            window.addEventListener('swipe', function (e) {
                if (e.direction === 'right') {
                    that.closeWindow(window, options);
                }
            });
        }

        if (OS_ANDROID && options.displayHomeAsUp !== false && !window.navBarHidden) {
            window.addEventListener('open', function () {
                var activity = window.getActivity();
                if (activity) {
                    var actionBar = activity.actionBar;
                    if (actionBar) {
                        actionBar.displayHomeAsUp = true;
                        actionBar.onHomeIconItemSelected = function () {
                            that.closeWindow(window, options);
                        };
                    }
                }
            });
        }

        return window.open(options);
    };

    NavigationWindow.prototype.closeWindow = function (window, options) {
        options = options || {};

        if (OS_ANDROID && options.animated !== false) {
            options.activityEnterAnimation = Ti.Android.R.anim.slide_in_left;
            options.activityExitAnimation = Ti.Android.R.anim.slide_out_right;
        }

        return window.close(options);
    };
}

exports.createNavigationWindow = function (args) {
    var navigationWindow = OS_IOS ? Ti.UI.iOS.createNavigationWindow(args) : new NavigationWindow(args);

    if (args && args.id) {
        Alloy.Globals[args.id] = navigationWindow;
    }

    return navigationWindow;
};

exports.createWindow = function(args)
{
    var forceWindowAndroid = args.forceWindowAndroid || false;

    var window = Ti.UI[(OS_IOS || forceWindowAndroid) ? 'createWindow' : 'createView'](args);

    if (Alloy.Globals.windowStack) {
        if (OS_IOS) {
            window.addEventListener('ti-window-stack:sizechanged', toggleMenuButton);
        }
        window.addEventListener('ti-window-stack:sizechanged', toggleSwipe);
    }

    // Show / hide the controls once the view is open
    if (OS_ANDROID) {
        window.addEventListener("open", function () {
            if (Alloy.Globals.windowStack && Alloy.Globals.windowStack.isNotRootLevel()) {
                // Show the home button and set onClick action
                window._internalActivity.actionBar.setDisplayHomeAsUp(true);
                window._internalActivity.actionBar.setOnHomeIconItemSelected(function() {
                    // Close the current window
                    Alloy.Globals.windowStack.back();
                });
            }
        });
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
