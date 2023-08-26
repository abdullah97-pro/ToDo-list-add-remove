import './style.css';
import { renderTasks, addTask, deleteTask, toggleTaskCompletion, clearCompletedTasks, editTask } from './todo';

renderTasks();

const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const clearCompletedBtn = document.getElementById('clear-completed-btn');

addTaskBtn.addEventListener('click', () => {
  const description = taskInput.value.trim();
  if (description !== '') {
    addTask(description);
    taskInput.value = '';
  }
});

taskList.addEventListener('click', (event) => {
  if (event.target.className === 'delete-btn') {
    const index = event.target.dataset.index;
    deleteTask(index);
  } else if (event.target.tagName === 'INPUT') {
    const index = event.target.dataset.index;
    toggleTaskCompletion(index);
  } else if (event.target.className === 'edit-btn') {
    const index = event.target.dataset.index;
    const listItem = event.target.parentNode;
    const taskDescription = listItem.querySelector('.task-description');
    const currentDescription = taskDescription.textContent;
    const newDescription = prompt('Enter the new task description:', currentDescription);
    if (newDescription !== null) {
      editTask(index, newDescription);
    }
  }
});

clearCompletedBtn.addEventListener('click', () => {
  clearCompletedTasks();
});