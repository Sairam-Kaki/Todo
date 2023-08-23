//@ts-nocheck
var taskNames = new Set();
function collapseBTN(btn) {
    btn.textContent == "-" ? btn.textContent = "+" : btn.textContent = "-";
}
function addTask() {
    var taskName = document.getElementById("new-task-name").value;
    if (taskNames.has(taskName)) {
        alert("Task Already exists!");
    }
    else {
        taskNames.add(taskName);
        var htmlcontent = "                    \n                            <span style='font-size:24px' class='statusSymbol'> ----</span>\n                            <h6 class='task-name'>".concat(taskName, "</h6>\n                            <select class='form-select form-select-sm mt-3 progress' id='sel' name='status' onchange=\"progress(this)\">\n                                <option Selected value='Not yet started'>Not yet started</option>\n                                <option value='In progress'>In progress</option>\n                                <option value='Completed'>Completed</option>\n                            </select>\n                            <button type='button' class='btn btn-danger btn-sm remove-btn' onclick='remove(this)'>X</button>\n                    ");
        var newElement = document.createElement('li');
        newElement.innerHTML = htmlcontent;
        newElement.className = 'list-group-item list-group-item-info task';
        var tasks = document.getElementById("tasks");
        tasks.appendChild(newElement);
    }
}
function remove(button) {
    // Get the parent row
    var row = button.parentNode;
    var taskName = row.querySelector(".task-name").textContent;
    taskNames.delete(taskName);
    row.remove();
}
function progress(prog) {
    var taskElement = prog.parentNode;
    var statusSymbol = taskElement.querySelector(".statusSymbol");
    if (prog.value == 'Not yet started') {
        taskElement.className = "list-group-item list-group-item-info task";
        statusSymbol.className = "";
        statusSymbol.textContent = " ----";
        var taskNameContainer = taskElement.querySelector(".task-name");
        var taskName = taskNameContainer.textContent;
        taskNameContainer.innerHTML = taskName;
    }
    else if (prog.value == 'In progress') {
        taskElement.className = "list-group-item list-group-item-warning task";
        statusSymbol.className = "spinner-grow text-warning";
        statusSymbol.textContent = " ";
        var taskNameContainer = taskElement.querySelector(".task-name");
        var taskName = taskNameContainer.textContent;
        taskNameContainer.innerHTML = taskName;
    }
    else if (prog.value == 'Completed') {
        taskElement.className = "list-group-item list-group-item-success task";
        statusSymbol.className = "";
        statusSymbol.textContent = "✅";
        var taskNameContainer = taskElement.querySelector(".task-name");
        ;
        var taskName = taskNameContainer.textContent;
        taskNameContainer.innerHTML = "<del>".concat(taskName, "</del>");
        taskNames.delete(taskName);
    }
}
function cleared() {
    var elements = document.querySelectorAll('.task');
    elements.forEach(function (element) {
        element.classList.remove("d-none");
    });
}
function search() {
    var searchValue = document.getElementById("search-box").value;
    var elements = document.querySelectorAll('.task');
    elements.forEach(function (element) {
        var taskName = element.querySelector(".task-name").textContent;
        if (!(taskName.includes(searchValue))) {
            element.classList.add("d-none");
        }
        else {
            element.classList.remove("d-none");
        }
    });
}
