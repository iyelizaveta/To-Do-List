const enterTask = document.getElementById('add_task__enter');
const addTaskBtn = document.getElementById('add_task__btn');
const taskListUnfin = document.getElementById('task_list_unfinished');
const taskListFin = document.getElementById('task_list_finished');

const createNewEnter = (task, isFinised) => {
    const listItem = document.createElement('li');
    listItem.className = "task_list__point";

    const descr = document.createElement('div');
    descr.className = "description";
    descr.textContent = task;

    const buttons = document.createElement('div');
    buttons.className = "buttons";

    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.className = "complete_task"

    const delTask = document.createElement('button');
    delTask.className = "delete_task";
    delTask.textContent = "Delete";

    if(isFinised) {
        listItem.className = "task_list__point checked";
        checkbox.setAttribute("checked", "checked");
    } else {
        listItem.className = "task_list__point";
    }

    taskListUnfin.appendChild(listItem);
    taskListFin.appendChild(listItem);
    listItem.appendChild(descr);
    listItem.appendChild(buttons);
    buttons.appendChild(checkbox);
    buttons.appendChild(delTask);

    return listItem;
}

const addTask = () => {
    if(enterTask.value) {
        const listItem = createNewEnter(enterTask.value, false);
        taskListUnfin.appendChild(listItem);
        bindTaskEvents(listItem, finishTask);
        enterTask.value = "";
    }
    save();
}

addTaskBtn.onclick = addTask;

function deleteTask() {
    const btn = this.parentNode
    const listItem = btn.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);
    save();
}

function finishTask() {
    const btn = this.parentNode;
    const listItem = btn.parentNode;
    listItem.classList.toggle('checked');
    taskListFin.appendChild(listItem);
    bindTaskEvents(listItem, unfinishTask);
    save();
}

function unfinishTask() {
    const btn = this.parentNode;
    const listItem = btn.parentNode;
    listItem.classList.toggle('checked');
    taskListUnfin.appendChild(listItem);
    bindTaskEvents(listItem, finishTask);
    save();
}

const bindTaskEvents = (listItem, checkboxEvent) => {
    const checkbox = listItem.querySelector('.complete_task');
    const delTask = listItem.querySelector('.delete_task');
    checkbox.onclick = checkboxEvent;
    delTask.onclick = deleteTask;
}

function save() {
    let taskListUnfinArr = [];
    for(let i = 0; i < taskListUnfin.children.length; i++) {
        taskListUnfinArr.push(taskListUnfin.children[i].querySelectorAll('.description')[0].textContent);
    }

    let taskListFinArr = [];
    for(let i = 0; i < taskListFin.children.length; i++) {
        taskListFinArr.push(taskListFin.children[i].querySelectorAll('.description')[0].textContent);
    }

    localStorage.removeItem('todo');
    localStorage.setItem('todo', JSON.stringify({
        taskListUnfin: taskListUnfinArr, 
        taskListFin: taskListFinArr
    }));
}

function load() {
    return JSON.parse(localStorage.getItem('todo'));
}

let data = load();
for(let i = 0; i < data.taskListUnfin.length; i++) {
    const listItem = createNewEnter(data.taskListUnfin[i], false);
    taskListUnfin.appendChild(listItem);
    bindTaskEvents(listItem, finishTask);
}

for(let i = 0; i < data.taskListFin.length; i++) {
    const listItem = createNewEnter(data.taskListFin[i], true);
    taskListFin.appendChild(listItem);
    bindTaskEvents(listItem, unfinishTask);
}