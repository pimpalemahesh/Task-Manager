// Define UI variables
const submit = document.querySelector(".add");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

window.addEventListener('keydown', function (e) { if (e.keyIdentifier == 'U+000A' || e.keyIdentifier == 'Enter' || e.keyCode == 13) { if (e.target.nodeName == 'INPUT' && e.target.type == 'text') { e.preventDefault(); return false; } } }, true);
loadEventListerners();
// load all event listeners
function loadEventListerners() {
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    submit.addEventListener('click', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTask);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
    // Focus on TaskInput
    taskInput.addEventListener('focus', focusTaskInput);
    // Focus out TaskInput
    taskInput.addEventListener('focusout', removeFocus);
}

function focusTaskInput(){
    submit.style.backgroundColor = "green";
}

function removeFocus(){
    submit.style.backgroundColor = "rgb(28, 215, 232)"
}

// Get Tasks from LocalStorage.

function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(
        function (task) {
            // Create li element
            const li = document.createElement("li");
            // Add class
            li.className = 'collection-item';
            // Create text node style it and append to li
            li.appendChild(document.createTextNode(task));
            li.style.backgroundColor = "white";
            li.style.color = "black";
            li.style.padding = "4px";
            li.style.borderRadius = "8px";
            li.style.border = "2px solid black";
            li.style.margin = "8px";

            // Create new Link element
            const image = document.createElement("img");
            image.style.width = "20px";
            image.style.height = "20px";
            // Add Class
            image.className = 'delete-item secondary-content';
            // Add icon
            image.src = 'icons/cancel.svg';
            // link.innerHTML = '<i class="fa fa-cancel"></i>'
            // Append link to Li
            li.appendChild(image);
            // Append li to ul
            taskList.appendChild(li);
        }
    )
}

// Add Task
function addTask() {
    if (taskInput.value === '') {
        alert("Add a Task First.");
        return;
    }

    storageTaskInLocalStorage(taskInput.value);

    // clear input
    taskInput.value = '';

}

// Store Task
function storageTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    location.reload();
}

// Remove Task
function removeTask(e) {
    console.log(e.target.parentElement)

    if (confirm("Do you really want to delete it?") == true) {
        if (e.target.classList.contains('delete-item')) {
            e.target.parentElement.remove();

            // Remove from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement);
        }
    } else {
        return;
    }
}

// Remove from Local Storage.
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    console.log(tasks);

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear Task
function clearTask() {
    if (confirm("Are you sure?") == true) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    } else {
        return;
    }

    // Clear Task From Local Storage.
    clearTaskFromLocalStorage();
}

// Clear Task From Local Storage
function clearTaskFromLocalStorage() {
    localStorage.clear();
    location.reload();
}

// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(".collection-item").forEach(
        function (task) {
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = "block";
            } else {
                task.style.display = "none";
            }
        }
    )
}