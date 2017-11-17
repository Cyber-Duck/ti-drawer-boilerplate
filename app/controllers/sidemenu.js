function onItemClick(e) {
    switch (e.itemIndex) {
        case 0:
            Alloy.Globals.windowStack.open(
                Alloy.createController('rootA').getView(),
                Alloy.Globals.drawer
            );
            break;
        case 1:
            Alloy.Globals.windowStack.open(
                Alloy.createController('rootB').getView(),
                Alloy.Globals.drawer
            );
            break;
        case 2:
            Alloy.Globals.windowStack.open(
                Alloy.createController('subScreenA').getView()
            );
            break;
    }

    Alloy.Globals.drawer.toggleLeftWindow();
}
