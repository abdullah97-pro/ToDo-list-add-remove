import { reset } from "ansi-colors";

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

export function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.draggable = true; // Enable dragging for each task

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = task.completed;
    checkBox.dataset.index = index;
    listItem.appendChild(checkBox);

    const taskDescription = document.createElement('span');
    taskDescription.textContent = task.description;
    taskDescription.classList.add('task-description');
    if (task.completed) {
      taskDescription.classList.add('completed');
    }
    listItem.appendChild(taskDescription);

    const editButton = document.createElement('button');
    editButton.textContent = '';
    editButton.className = 'edit-btn';
    editButton.dataset.index = index;
    listItem.appendChild(editButton);

    const editIcon = document.createElement('i');
    editIcon.className = 'fas fa-ellipsis-v';
    editButton.appendChild(editIcon);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '';
    deleteButton.className = 'delete-btn';
    deleteButton.dataset.index = index;
    listItem.appendChild(deleteButton);

    listItem.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', index);
      });
  
      listItem.addEventListener('dragover', (event) => {
        event.preventDefault();
      });
  
      listItem.addEventListener('drop', (event) => {
        event.preventDefault();
        const sourceIndex = event.dataTransfer.getData('text/plain');
        const targetIndex = index;
        swapTasks(sourceIndex, targetIndex);
      });

      checkBox.addEventListener('click', (event) => {
        const index = event.target.dataset.index;
        tasks[index].completed = tasks[index].completed;
        saveTasks();
        renderTasks();
      });
  
      taskList.appendChild(listItem);
    });
}

function swapTasks(sourceIndex, targetIndex) {
    const sourceTask = tasks[sourceIndex];
    const targetTask = tasks[targetIndex];
    tasks[sourceIndex] = targetTask;
    tasks[targetIndex] = sourceTask;
    saveTasks();
    renderTasks();
  }

export function addTask(description) {
  const newTask = {
    description,
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
}

export function deleteTask(index) {
  if (tasks[index]) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

export function toggleTaskCompletion(index) {
  if (tasks[index]) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  }
}

export function editTask(index, newDescription) {
  tasks[index].description = newDescription;
  saveTasks();
  renderTasks();
}

export function clearCompletedTasks() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}