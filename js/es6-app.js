// --- Variables
// ---------------------

const form = document.querySelector('#task-form'),
      taskList = document.querySelector('.collection'),
      clearBtn = document.querySelector('.clear-tasks'),
      filter = document.querySelector('#filter'),
      taskInput = document.querySelector('#task');

// --- Functions
// ---------------------

// Get tasks from localStorage
const getTasks = () => {
  // Create variable for tasks
  let tasks;
  // Check if storage is empty
  if (localStorage.getItem('tasks') === null) {
    task = [];
  } else {
    // Pass exisiting tasks to variable
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  // Render local tasks to UI
  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create new link element
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // Add icon to html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to <li>
    li.appendChild(link);
    // Append <li> to <ul>
    taskList.appendChild(li);
  })
};

// Store tasks in localStorage
const storeTaskInLocalStorage  = task => {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  // Push tasks to array
  tasks.push(task);

  // Send tasks to localStorage as JSON
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// remove from localStorage
const removeTaskFromLocalStorage = taskItem => {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    // Pass exisiting tasks to variable
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  // Remove task
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Add task
const addTask = e => {
  // Prevent default behaviour
  e.preventDefault();

  let tasks;
  let state = false;

  if (localStorage.getItem('tasks') === null) {
      tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  // Validate for task with existing name
  tasks.forEach(function(task, index) {
    if (task === taskInput.value) {
      alert('Task already exists.');
      state = true;
    }
  });

  if (state === false) {
    // Validate
    if (taskInput.value === '') {
      alert('Add a task.');
    }

    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    taskList.appendChild(li);

    // Store in localStorage
    storeTaskInLocalStorage(taskInput.value);

    // Clear taskInput
    taskInput.value = '';
  }

};

// Remove task
const removeTask = e => {
  // Bubbling
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      // Remove task
      e.target.parentElement.parentElement.remove();
      // Remove from localStorage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
};

const clearTasks = () => {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // Clear task from localStorage
  localStorage.clear();
};

// Filter tasks
const filterTasks = e => {
  const text = e.target.value.toLowerCase();

  // Iterate throught all tasks and validate
  document.querySelectorAll('.collection-item').forEach(function () {
    const item = task.firstChild.textContent;

    // Check for index
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
};

// Fire all events
const loadEventListeners = () => {
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
};

loadEventListeners();
