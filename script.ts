
//@ts-nocheck
const taskNames: Set<string> = new Set();

function collapseBTN(btn: HTMLElement): void {
    btn.textContent == "-" ? btn.textContent = "+" : btn.textContent = "-";
}

function addTask() {
    const taskName: string = (document.getElementById("new-task-name") as HTMLInputElement).value;

    if (taskNames.has(taskName)) {
        alert("Task Already exists!")
    }
    else {
        taskNames.add(taskName);
        const htmlcontent: string = `                    
                            <span style='font-size:24px' class='statusSymbol'> ----</span>
                            <h6 class='task-name'>${taskName}</h6>
                            <select class='form-select form-select-sm mt-3 progress' id='sel' name='status' onchange="progress(this)">
                                <option Selected value='Not yet started'>Not yet started</option>
                                <option value='In progress'>In progress</option>
                                <option value='Completed'>Completed</option>
                            </select>
                            <button type='button' class='btn btn-danger btn-sm remove-btn' onclick='remove(this)'>X</button>
                    `
        const newElement: HTMLElement = document.createElement('li');
        newElement.innerHTML = htmlcontent;
        newElement.className = 'list-group-item list-group-item-info task'
        const tasks: HTMLElement = document.getElementById("tasks") as HTMLElement;
        tasks.appendChild(newElement);
    }
}

function remove(button: HTMLButtonElement): void {
    // Get the parent row
    const row: HTMLElement = button.parentNode as HTMLElement;
    const taskName: string = (row.querySelector(".task-name") as HTMLElement).textContent as string;
    taskNames.delete(taskName);
    row.remove();
}

function progress(prog: HTMLSelectElement): void {
    const taskElement: HTMLElement = prog.parentNode as HTMLElement;
    const statusSymbol: HTMLSpanElement = taskElement.querySelector(".statusSymbol") as HTMLSpanElement;

    if (prog.value == 'Not yet started') {

        taskElement.className = "list-group-item list-group-item-info task";
        statusSymbol.className = "";
        statusSymbol.textContent = " ----";

        const taskNameContainer: HTMLHeadingElement = taskElement.querySelector(".task-name") as HTMLHeadingElement;
        const taskName: string = taskNameContainer.textContent as string;
        taskNameContainer.innerHTML = taskName;
    }
    else if (prog.value == 'In progress') {

        taskElement.className = "list-group-item list-group-item-warning task";
        statusSymbol.className = "spinner-grow text-warning";
        statusSymbol.textContent = " ";

        const taskNameContainer: HTMLHeadingElement = taskElement.querySelector(".task-name") as HTMLHeadingElement;
        const taskName: string = taskNameContainer.textContent as string;
        taskNameContainer.innerHTML = taskName;
    }
    
    else if(prog.value == 'Completed'){

        taskElement.className = "list-group-item list-group-item-success task";
        statusSymbol.className = "";
        statusSymbol.textContent = "✅";

        const taskNameContainer: HTMLHeadingElement = taskElement.querySelector(".task-name") as HTMLHeadingElement;;
        const taskName: string = taskNameContainer.textContent as string;

        taskNameContainer.innerHTML = `<del>${taskName}</del>`;

        taskNames.delete(taskName);

    }
}

function cleared(): void {
    const elements: NodeListOf<Element> = document.querySelectorAll('.task');

    elements.forEach(element => {
        element.classList.remove("d-none");
    });
}

function search() {
    const searchValue: string = (document.getElementById("search-box") as HTMLInputElement).value as string

    const elements: NodeListOf<Element> = document.querySelectorAll('.task');

    elements.forEach(element => {
        const taskName: string = (element.querySelector(".task-name") as HTMLElement).textContent as string;
        if (!(taskName.includes(searchValue))) {
            element.classList.add("d-none");
        }
        else {
            element.classList.remove("d-none");
        }
    });
}

