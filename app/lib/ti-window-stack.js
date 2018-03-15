/**
 * An Alloy widget to manage windows stack in same code
 * for iOS and Android, including drawer support.
 */
function WindowStack() {
    // The navigation object for iOS
    var navigationWindow = null,
        // Windows array for history pepuse
        windows = [],
        that = this;

    /**
     * Using backbone events
     */
    var Backbone = require("alloy/backbone"),
        events = _.clone(Backbone.Events);

    this.on = events.on;
    this.off = events.off;
    this.trigger = events.trigger;

    /**
     * Who am i?
     *
     * @type {String}
     */
    this.apiName = "ti-window-stack";

    /**
     * Constant to open the window into the center of the drawer
     *
     * @type {Number}
     */
    this.CENTER_WINDOW = 101;

    /**
     * Constant to open the window into the right of the drawer
     *
     * @type {Number}
     */
    this.RIGHT_WINDOW = 102;

    /**
     * Constant to open the window into the left of the drawer
     *
     * @type {Number}
     */
    this.LEFT_WINDOW = 103;

    /**
     * Which side to open new window in the drawer, center is default
     *
     * @type {[type]}
     */
    this.targetInDrawer = this.CENTER_WINDOW;

    /**
     * Get external created NavigationWindow
     *
     * @return  {Ti.UI.iOS.NavigationWindow} navigationWindow NavigationWindow set.
     */
    this.getNavigationWindow = function() {
        return navigationWindow;
    };

    /**
     * Set external created NavigationWindow
     *
     * @param  {Ti.UI.iOS.NavigationWindow} _navigationWindow NavigationWindow to set.
     * @return {void}
     */
    this.setNavigationWindow = function(_navigationWindow) {
        navigationWindow = _navigationWindow;
    };

    /**
     * Setter of targetInDrawer.
     *
     * @param  {Number} targetInDrawer Constants: WindowStack.CENTER_WINDOW, WindowStack.RIGHT_WINDOW or WindowStack.LEFT_WINDOW
     * @return {void}
     */
    this.setTargetInDrawer = function (targetInDrawer) {
        if ([that.CENTER_WINDOW, that.RIGHT_WINDOW, that.LEFT_WINDOW].indexOf(targetInDrawer) !== -1) {
            that.targetInDrawer = targetInDrawer;
        }
    };

    /**
     * Open window into the stack, you can pass instance from nl.fokkezb.drawer to open this
     * window into drawer center window.
     *
     * @param  {Ti.UI.Window/Ti.UI.View} _window Window/View to open.
     * @param  {nl.fokkezb.drawer} drawer nl.fokkezb.drawer instance. (Optional)
     * @param  {openWindowParams} params Animation or display properties to use when opening the window. (Optional)
     * @return {void}
     */
    this.open = function(_window, drawer, params) {
        drawer = drawer || false;
        params = params || {};

        // On open the window --> trigger useful event
        _window.addEventListener("open", function(e) {
            that.trigger("sizechanged", { type: "sizechanged", source: e.source });
        });
        // On close the window --> update the windows array + trigger useful event
        _window.addEventListener("close", function(e) {
            windows = _.without(windows, _window);
            that.trigger("sizechanged", { type: "sizechanged", source: e.source });
        });

        if (OS_IOS) {
            // Create navigationWindow if we don't have, or if we have side menu
            if (navigationWindow === null || drawer) {
                navigationWindow = Ti.UI.iOS.createNavigationWindow({
                    window: _window
                });
                if (drawer) {
                    // Open the window into the drawer in center, right or left?
                    if (that.targetInDrawer === that.RIGHT_WINDOW) {
                        drawer.setRightWindow(navigationWindow);
                    } else if (that.targetInDrawer === that.LEFT_WINDOW) {
                        drawer.setLeftWindow(navigationWindow);
                    } else {
                        drawer.setCenterWindow(navigationWindow);
                    }
                } else {
                    navigationWindow.open(params);
                }
                // Reset our local stack reference
                windows = [_window];
            } else {
                // Add this window to my stack reference
                windows.push(_window);
                // Or just push new window to the stack
                navigationWindow.openWindow(_window);
            }
        } else if (OS_ANDROID) {
            if (drawer) {
                // Extend some properties to drawer containner
                _.extend(drawer.window, _.pick(_window, ["title", "keepScreenOn", "exitOnClose"]));
                // Since android center item is view not a window, we have to fire it ourselves
                _window.fireEvent("open", { source: _window, type: "open" });
                // Generate Android menu
                var activity = drawer.window.getActivity();
                activity.onCreateOptionsMenu = function(e) {
                    // Clean up all items from any other controller
                    e.menu.clear();
                    if (_window.hasOwnProperty("onCreateOptionsMenu")) {
                        _window.onCreateOptionsMenu(e);
                    }
                };

                // Try to refresh menus if the activity created
                try {
                    activity.invalidateOptionsMenu();
                } catch (e) {
                    console.warn("Maybe we still do not have activity to update the menu, it works now by the way.");
                }

                // Open the window into the drawer in center, right or left?
                if (that.targetInDrawer === that.RIGHT_WINDOW) {
                    drawer.setRightWindow(_window);
                } else if (that.targetInDrawer === that.LEFT_WINDOW) {
                    drawer.setLeftWindow(_window);
                } else {
                    drawer.setCenterWindow(_window);
                }

                // Reset our local stack refrance
                windows = [];
            } else {
                // Add this window to my stack reference
                windows.push(_window);
                // Open the window
                _window.open(params);
            }
        }
    };

    /**
     * Retrieve the size of the current window stack.
     *
     * @return {Number}
     */
    this.getSize = function() {
        return windows.length;
    };

    /**
     * Clarify if the current stack has more than one root level or not.
     *
     * @return {Boolean}
     */
    this.isRootLevel = function() {
        return windows.length === 1;
    };

    /**
     * Clarify if the current stack has more than one root level or not.
     *
     * @return {Boolean}
     */
    this.isNotRootLevel = function() {
        return windows.length > 1;
    };

    /**
     * Returns last Window from the windows array
     *
     * @return {Ti.UI.Window}
     */
    this.getCurrentWindow = function() {
        return _.last(windows);
    };

    /**
     * Pop window from the stack.
     *
     * @param  {Ti.UI.Window/Ti.UI.View} _window Window or View to close
     * @return {void}
     */
    this.close = function(_window) {
        if (OS_IOS && _window && navigationWindow) {
            navigationWindow.closeWindow(_window);
        } else if (OS_ANDROID && _window) {
            _window.close();
        }
    };

    /**
     * Closes the most recent openned `Ti.UI.Window` in the stack.
     *
     * @return {void}
     */
    this.back = function() {
        // Get last window in the stack
        var _window = _.last(windows);
        // In case assign this function directly to UI item, this will pass to the UI item it self, better use that
        if (_window) {
            that.close(_window);
        }
    };

    /**
     * By default, closes all the windows, one after the other, starting for the current window.
     * User sees all the windows getting closed.
     *
     * @param  {Object} _params _params.animated: Controls wether to animate when
     *                         all windows are getting closed or not.
     * @return {void}
     */
    this.home = function(_params) {
        _params = _params || {};
        _.defaults(_params, { animated: true, callback: function() {} });

        var lastLength = windows.length;

        if (_params.animated) {
            // Animate the window closing so the user sees all of them getting
            // closed one after the other
            Alloy.Globals.homeInterval = setInterval(function() {
                if (lastLength === windows.length) {
                    Alloy.Globals.windowStack.back();
                    lastLength--;

                    if (lastLength === 1 || windows[lastLength - 1].apiName === "Ti.UI.View") {
                        // Center window is actually view on Android
                        clearInterval(Alloy.Globals.homeInterval);
                        if (_params.callback && _.isFunction(_params.callback)) {
                            _params.callback();
                        }
                    }
                }
            }, 100);
        } else {
            // Closes all other windows except the last one (so users don't see
            // the other windows getting closed) and finally closes the current
            // window.
            var lastWindow = _.last(windows),
                rest = _.without(windows, lastWindow);

            if (_params.callback && _.isFunction(_params.callback)) {
                lastWindow.addEventListener("close", _params.callback);
            }

            rest.forEach(function(window, index) {
                if (index === 0 && window.apiName === "Ti.UI.View") {
                    return;
                }
                that.close(window);
            });
            that.close(lastWindow);
        }
    };

    /**
     * Close all Windows, close the navigationWindow or drawer.
     *
     * @param  {nl.fokkezb.drawer} drawer Drawer to close. (Optional)
     * @param  {Callable} closeCallBack Will call it after close last screen. (Optional)
     * @return {void}
     */
    this.destroy = function(drawer, closeCallBack) {
        if (drawer) {
            if (closeCallBack) {
                if (OS_IOS) {
                    drawer.addEventListener("close", closeCallBack);
                } else if (OS_ANDROID) {
                    drawer.window.addEventListener("close", closeCallBack);
                }
            }
            drawer.close();
        } else if (OS_IOS) {
            closeCallBack && navigationWindow.addEventListener("close", closeCallBack);
            navigationWindow.close();
        } else if (OS_ANDROID) {
            closeCallBack && _.last(windows).addEventListener("close", closeCallBack);
            _.each(windows, function(_window) {
                if (_window) {
                    _window.close();
                }
            });
        }
    };

}

/**
 * Create new instance.
 *
 * @return {WindowStack} New instance of WindowStack.
 */
exports.createWindowStack = function() {
    return new WindowStack();
};
