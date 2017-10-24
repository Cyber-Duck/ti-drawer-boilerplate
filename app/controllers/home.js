function openScreenB() {
    Alloy.Globals.windowStack.open(Alloy.createController('screenB').getView());
}

$.getView().addEventListener("ti-window-stack:sizechanged", function () {
    $.stackSize.setText("Stack size: " + Alloy.Globals.windowStack.getSize());
});

function showActionBarLogo() {
    $.home.activity.actionBar.setLogo('logo.png');
}
// $.home.addEventListener('open', function() {
//     console.log('open');
//     console.log('open');
//     console.log('open');
//     console.log('open');
//     console.log('open');
// //    var actionBar = win.activity.actionBar;
// //    actionBar.setLogo('KS_nav_ui.png');
// });
