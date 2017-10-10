function ApplicationInterfaceHorizontalContainer(element) {

    var self = this;
    var visible = false;
    
    self.show = _show;
    self.hide = _hide;
    self.isVisible = _isVisible;

    function _show(gridSize) {
        element.classList.add(gridSize);
        element.classList.remove('col-0');
        visible = true;
    };

    function _hide(gridSize) {
        element.classList.add('col-0');
        element.classList.remove(gridSize);
        visible = false;
    };

    function _isVisible() {
        return visible;
    }

}