const { Button } = require("bootstrap");

const enterTask = document.getElementById('add_task__enter');
const addTask = document.getElementById('add_task__btn');
const taskList = document.getElementById('task_list');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let taskListPoint = [];

function Task(description) {
    this.description = description;
    this.completed = false;
}

const createNewEnter = (task, index) => {
    return `
        <li id="task_list__point" ${task.completed ? 'checked' : ''}">
            <div id="description">${task.description}</div>
            <div id="buttons">
                <input onclick="isCompleted(${index})" type="checkbox" id="complete_task" ${task.completed ? 'checked' : ''}>
                <button onclick="deleteTask(${index})" id="delete_task" type="button">Delete</button>
            </div>
        </li>
    `
}

const filterTask = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks,...completedTasks];
}

const fillList = () => {
    taskList.innerHTML = "";
    if(tasks.length > 0) {
        filterTask();
        tasks.forEach((item, index) => {
            taskList.innerHTML += createNewEnter(item, index);
        });
        taskListPoint = document.querySelectorAll('.task_list__point');
    }
}

const fillListComplete = () => {
   isCompleted.innerHTML = "";
    if(tasks.length > 0) {
        tasks.forEach((item, index) => {
            isCompleted.innerHTML += createNewEnter(item, index);
        });
        taskListPoint = document.querySelectorAll('.task_list__point');
    }
}

fillList();

const updLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const updList = () => {
    updLocal();
    fillList();
}

const isCompleted = index => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed) {
        taskListPoint[index].classList.add('checked');
    } else {
        taskListPoint[index].classList.remove('checked');
    }
    updList();
}

addTask.addEventListener('click', () => {
    tasks.push(new Task(enterTask.value));
    updList();
    enterTask.value = '';
})

const deleteTask = index => {
    tasks.splice(index, 1);
    updList();
}