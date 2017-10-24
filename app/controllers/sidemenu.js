function onItemClick(e) {
    switch (e.itemIndex) {
        case 0:
            Alloy.Globals.windowStack.open(Alloy.createController('home').getView(), Alloy.Globals.drawer);
            break;
        case 1:
            Alloy.Globals.windowStack.open(Alloy.createController('screenA').getView(), Alloy.Globals.drawer);
            break;
        case 2:
            Alloy.Globals.windowStack.open(Alloy.createController('screenB').getView());
            break;
    }

    Alloy.Globals.drawer.toggleLeftWindow();
}
