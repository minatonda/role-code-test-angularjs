function ApplicationInterface(element) {

    var self = this;
    var isShowingTaskDetail = false;
    var appTaskList = new ApplicationInterfaceTaskList(element.querySelector('.panel-left'), {
        listTask: JSON.parse(localStorage.getItem("listTask") || '[]'),
        callbacks: {
            onSelectTask: _onSelectTask
        }
    });
    var appTaskEditor = new ApplicationInterfaceTaskEditor(element.querySelector('.panel-right'), {
        callbacks: {
            onAddTask: _onAddTask
        }
    });

    self.showTaskList = _showTaskList;
    self.hideTaskList = _hideTaskList;
    self.showTaskEditor = _showTaskEditor;
    self.hideTaskEditor = _hideTaskEditor;
    self.saveTask = _saveTask;

    function _showTaskList() {
        if (appTaskEditor.isVisible()) {
            appTaskList.show('col-3');
        } else {
            appTaskList.show('col-6');
        }
    }

    function _hideTaskList() {
        if (appTaskEditor.isVisible()) {
            appTaskList.hide('col-3');
        } else {
            appTaskList.hide('col-6');
        }
    }

    function _showTaskEditor(task) {
        self.hideTaskList();
        appTaskEditor.show('col-3');
        self.showTaskList();
    }

    function _hideTaskEditor() {
        self.hideTaskList();
        appTaskEditor.hide('col-3');
        self.showTaskList();
    }

    function _onAddTask(task) {
        if (isShowingTaskDetail) {
            isShowingTaskDetail = false;
        } else {
            appTaskList.addTask(task);
            localStorage.setItem("listTask", JSON.stringify(appTaskList.getListTask()));
        }
        _hideTaskEditor();
    }

    function _onSelectTask(task) {
        isShowingTaskDetail = true;
        appTaskEditor.showTask(task);
        _showTaskEditor();
    }

    function _saveTask() {
        appTaskEditor.addTask();
    }

}