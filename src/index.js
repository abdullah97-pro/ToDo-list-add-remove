import './style.css';

const tasks = [
  { description: 'wash the dishes', completed: false, index: 1 },
  { description: 'complete To Do list project', completed: false, index: 2 },
  { description: 'please give suggestion i only have one chance', completed: false, index: 3 },
];

function renderTodoList() {
  const todoList = document.getElementById('todo-list');

  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task) => {
    const listItem = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      if (checkbox.checked) {
        listItem.classList.add('completed');
      } else {
        listItem.classList.remove('completed');
      }
    });

    const label = document.createElement('label');
    label.textContent = task.description;

    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'fas fa-ellipsis-v delete-icon';

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(deleteIcon);

    if (task.completed && task.index !== 2) {
      listItem.classList.add('completed');
    }

    todoList.appendChild(listItem);
  });
}

window.addEventListener('DOMContentLoaded', renderTodoList);
