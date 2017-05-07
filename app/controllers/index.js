Alloy.Globals.windowStack.open(Alloy.createController('home').getView(), $.drawer);

// Drawer come from right or left
var direction = Ti.Locale.currentLanguage === 'ar' ? 'Right' : 'Left';

// set side menu view
$.drawer['set' + direction + 'Window'](Alloy.createController('sidemenu').getView());

// Add drawer to global for common use
Alloy.Globals.drawer = $.drawer;
$.drawer.addEventListener('close', function() {
    Alloy.Globals.drawer = null;
});

$.drawer.open();
