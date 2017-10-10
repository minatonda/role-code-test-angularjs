function ApplicationInterfaceTaskList(element, props) {
    ApplicationInterfaceHorizontalContainer.call(this, element);

    var self = this;
    var _listTask = (props && props.listTask) || [];

    self.addTask = _addTask;
    self.getListTask = _getListTask;

    _init();

    function _init() {
        _htmlUpdateTaskList(_listTask);
    };

    function _addTask(task) {
        _listTask.push(task);
        _htmlUpdateTaskList(_listTask);
    };

    function _getListTask() {
        return _listTask;
    }

    function _taskCheck(task) {
        task.check = true;
    }

    function _htmlUpdateTaskList(listTask) {
        while (element.querySelector('.js-task-list').firstChild) {
            element.querySelector('.js-task-list').removeChild(element.querySelector('.js-task-list').firstChild);
        }
        var count = 0;
        listTask.forEach(function (task) {
            count++;
            element.querySelector('.js-task-list').appendChild(_htmlCreateTaskRow(task));
        });
        while (count <= 20) {
            element.querySelector('.js-task-list').appendChild(_htmlCreateTaskRow({}));
            count++;
        }
    }

    function _htmlCreateTaskRow(task) {
        var div = document.createElement('div');
        div.classList.add('row');
        div.classList.add('row-eq-height');
        div.classList.add('row-va-middle')
        div.classList.add('notebook-row');
        div.onclick = function () {
            props.callbacks.onSelectTask(task);
        }

        div.appendChild(_htmlCreateTaskColMenu(task));
        div.appendChild(_htmlCreateTaskColDetail(task));

        return div;
    }

    function _htmlCreateTaskColDetail(task) {
        var div = document.createElement('div');
        div.classList.add('col-5');
        div.classList.add('p-padding-left-0');

        var spanName = document.createElement('span');
        spanName.innerHTML += task.name || '';

        div.appendChild(spanName);
        return div;
    }

    function _htmlCreateTaskColMenu(task) {
        var div = document.createElement('div');
        div.classList.add('col-1');
        div.classList.add('p-padding-right-0');

        var buttonCheck = document.createElement('button');
        //buttonCheck.innerText = "Checkar";
        buttonCheck.classList.add('btn-img');
        buttonCheck.classList.add('img-check');
        buttonCheck.onclick = function () {
            _taskCheck(task);
        };

        div.appendChild(buttonCheck);
        return div;
    }

}