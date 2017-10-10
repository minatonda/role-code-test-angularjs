function ApplicationInterfaceTaskEditor(element, props) {

    ApplicationInterfaceHorizontalContainer.call(this, element);

    var self = this;
    var _listFields = [{
        name: "task_name",
        property: "name",
        placeholder: "New Task",
        type: ApplicationUtils.FIELD_TYPE.INPUT_TEXT_HEADER
    }, {
        name: "task_description",
        property: "description",
        placeholder: "Description",
        type: ApplicationUtils.FIELD_TYPE.INPUT_TEXT
    }];

    _init();

    self.addTask = _addTask;
    self.showTask = _setToForm;

    function _init() {
        _htmlCreateForm();
    }

    function _addTask() {
        var task = _getFromForm();
        props.callbacks.onAddTask(task);
    }

    function _showTask(task){
        _setToForm(task);
    }

    function _getFromForm(task) {
        var task = {};
        _listFields.filter(function (item) {
            return item.type = ApplicationUtils.FIELD_TYPE.INPUT_TEXT;
        }).forEach(function (item) {
            task[item.property] = element.querySelector('[name="' + item.name + '"]').value;
        });
        return task;
    }

    function _setToForm(task) {
        _listFields.filter(function (item) {
            return item.type = ApplicationUtils.FIELD_TYPE.INPUT_TEXT;
        }).forEach(function (item) {
            element.querySelector('[name="' + item.name + '"]').value = task[item.property];
        });
    }

    function _htmlCreateForm() {
        _listFields.forEach(function (item) {
            element.querySelector('.js-task-form').appendChild(ApplicationUtils.createField(item));
        });
    }

}