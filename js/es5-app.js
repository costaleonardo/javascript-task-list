// --- Variables
// ---------------------
var form = document.querySelector('#task-form'),
      taskList = document.querySelector('.collection'),
      clearBtn = document.querySelector('.clear-tasks'),
      filter = document.querySelector('#filter'),
      taskInput = document.querySelector('#task');

// --- Functions
// ---------------------

// Get tasks from localStorage
function getTasks () {
  // Create variable for tasks
  var tasks;
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
    var li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create new link element
    li.appendChild(document.createTextNode(task));
    // Create new link element
    var link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // Add icon to html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to <li>
    li.appendChild(link);
    // Append <li> to <ul>
    taskList.appendChild(li);
  })
}

// Store task in localStorage
function storeTaskInLocalStorage (task) {
  var tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  // Push tasks to array
  tasks.push(task);

  // Send tasks to localStorage as JSON
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove from localStorage
function removeTaskFromLocalStorage (taskItem) {
  var tasks;

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
}

// Add task
function addTask (e) {
  // Prevent default behaviour
  e.preventDefault();

  // Validate
  if (taskInput.value === '') {
    alert('Add a task');
  }

  var li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));

  var link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);

  taskList.appendChild(li);

  // Store in localStorage
  storeTaskInLocalStorage(taskInput.value);

  // Clear taskInput
  taskInput.value = '';
}

// Remove task
function removeTask (e) {
  // Bubbling
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      // Remove task
      e.target.parentElement.parentElement.remove();
      // Remove from localStorage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Clear tasks
function clearTasks () {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // Clear task from localStorage
  localStorage.clear();
}

// Filter tasks
function filterTasks (e) {
  var text = e.target.value.toLowerCase();

  // Iterate throught all tasks and validate
  document.querySelectorAll('.collection-item').forEach(function () {
    var item = task.firstChild.textContent;

    // Check for index
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

// Fire all events
function loadEventListeners() {
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
}

loadEventListeners();
