var ApplicationUtils = {
    createField: function (props) {
        switch (props.type) {
            case (ApplicationUtils.FIELD_TYPE.BUTTON):
                {
                    var div = document.createElement('div');
                    div.classList.add(props.divClass);

                    var input = document.createElement('button');
                    input.name = props.name;
                    input.innerText = props.innerText;
                    input.onclick = props.onclick;

                    return div.appendChild(input);
                }
            case (ApplicationUtils.FIELD_TYPE.INPUT_TEXT):
                {
                    var divRow = document.createElement('div');
                    divRow.classList.add('row');

                    var divCol1 = document.createElement('div');
                    divCol1.classList.add('col-1');

                    divRow.appendChild(divCol1);

                    var divCol5 = document.createElement('div');
                    divCol5.classList.add('col-5');

                    divRow.appendChild(divCol5);

                    var divCol5Row = document.createElement('div');
                    divCol5Row.classList.add('row');
                    divCol5Row.classList.add('input-container');

                    divCol5.appendChild(divCol5Row);

                    var divCol5RowCol6 = document.createElement('div');
                    divCol5RowCol6.classList.add('col-6');

                    divCol5Row.appendChild(divCol5RowCol6);

                    var input = document.createElement('textarea');
                    input.name = props.name;
                    input.placeholder = props.placeholder;

                    divCol5RowCol6.appendChild(input);

                    return divRow;
                }
            case (ApplicationUtils.FIELD_TYPE.INPUT_TEXT_HEADER):
                {
                    var divRow = document.createElement('div');
                    divRow.classList.add('row');
                    divRow.classList.add('input-container');
                    divRow.classList.add('input-lg');

                    var divCol1 = document.createElement('div');
                    divCol1.classList.add('col-1');

                    var button = document.createElement('button');
                    button.classList.add('btn-img');
                    button.classList.add('btn-lg');
                    button.classList.add('img-check');

                    divCol1.appendChild(button);

                    var divCol5 = document.createElement('div');
                    divCol5.classList.add('col-5');

                    var input = document.createElement('input');
                    input.name = props.name;
                    input.placeholder = props.placeholder;

                    divCol5.appendChild(input);

                    divRow.appendChild(divCol1);
                    divRow.appendChild(divCol5);

                    return divRow;
                }
        }
        return div;

    },
    FIELD_TYPE: {
        BUTTON: 0,
        INPUT_TEXT: 1,
        INPUT_TEXT_HEADER: 2
    }
}