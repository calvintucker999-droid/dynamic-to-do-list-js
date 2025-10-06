document.addEventListener('DOMContentLoaded', function () {
// Form selection
const form = document.getElementById('registration-form');
// Feedback div selection
const feedbackDiv = document.getElementById('form-feedback');

```
// Submit event listener
form.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent normal form submission

    // Retrieve and trim inputs
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validation setup
    let isValid = true;
    const messages = [];

    // Username validation: at least 3 chars
    if (username.length < 3) {
        isValid = false;
        messages.push('Username must be at least 3 characters long.');
    }

    // Email validation: must include '@' and '.'
    if (!(email.includes('@') && email.includes('.'))) {
        isValid = false;
        messages.push('Email must contain both "@" and "." characters.');
    }

    // Password validation: at least 8 chars
    if (password.length < 8) {
        isValid = false;
        messages.push('Password must be at least 8 characters long.');
    }

    // Show feedback area
    feedbackDiv.style.display = 'block';

    if (isValid) {
        // Success
        feedbackDiv.textContent = 'Registration successful!';
        feedbackDiv.style.color = '#28a745';
        feedbackDiv.style.backgroundColor = '#d4edda';
        feedbackDiv.style.border = '1px solid #c3e6cb';
        // Optionally reset the form after success
        form.reset();
    } else {
        // Show errors joined by <br>
        feedbackDiv.innerHTML = messages.join('<br>');
        feedbackDiv.style.color = '#dc3545';
        feedbackDiv.style.backgroundColor = '#f8d7da';
        feedbackDiv.style.border = '1px solid #f5c6cb';

        // Focus first invalid field for better UX
        if (username.length < 3) {
            document.getElementById('username').focus();
        } else if (!(email.includes('@') && email.includes('.'))) {
            document.getElementById('email').focus();
        } else {
            document.getElementById('password').focus();
        }
    }
});
```

});

/*
script.js

* Implements a dynamic to-do list: add tasks, display them, and remove them.
* All code runs after DOMContentLoaded so elements are available.
  */

document.addEventListener('DOMContentLoaded', function () {
// Select DOM elements (names required by the assignment)
const addButton = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

```
// Function to add a task to the list
function addTask() {
    // Get the trimmed text from the input
    const taskText = taskInput.value.trim();

    // If input is empty, alert the user
    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    // Create a new list item and set its text
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create the remove button for this task
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // When remove button is clicked, remove the corresponding li from the list
    removeBtn.onclick = function () {
        taskList.removeChild(li);
    };

    // Append the remove button to the list item
    li.appendChild(removeBtn);

    // Append the list item to the task list
    taskList.appendChild(li);

    // Clear the input field for the next task
    taskInput.value = '';
    taskInput.focus();
}

// Add click event listener to the "Add Task" button
addButton.addEventListener('click', addTask);

// Allow adding a task by pressing 'Enter' in the input field
taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        // Prevent form submission / default behavior if any
        event.preventDefault();
        addTask();
    }
});

// (Optional) You could pre-populate tasks or restore from storage here.
// The assignment asked to "invoke the addTask function on DOMContentLoaded" —
// calling addTask() immediately on load would attempt to add whatever is in the input.
// To avoid accidentally adding an empty task, we don't call addTask() automatically here.
```

});

/*
script.js

Adds Local Storage persistence to the To-Do List application.
Tasks are loaded from localStorage on page load, and saved whenever they are added/removed.
*/

document.addEventListener('DOMContentLoaded', function () {
// Select DOM elements (exact names required by the assignment)
const addButton = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Load tasks array from localStorage (or initialize empty array)
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

// Save the current tasks array to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Create a DOM <li> element for a given task text and wire up its remove button
function createTaskElement(taskText) {
    const li = document.createElement('li');

    // Use a span to hold the task text (keeps structure flexible)
    const textSpan = document.createElement('span');
    textSpan.textContent = taskText;

    // Create remove button and its click handler
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    removeBtn.addEventListener('click', function () {
        // Remove the element from the DOM
        if (li.parentNode === taskList) {
            taskList.removeChild(li);
        }

        // Remove the first matching occurrence from the tasks array
        const index = tasks.indexOf(taskText);
        if (index > -1) {
            tasks.splice(index, 1);
            saveTasks();
        }
    });

    // Assemble li
    li.appendChild(textSpan);
    li.appendChild(removeBtn);
    return li;
}

/**
 * addTask(taskText = null, save = true)
 * - If taskText is null, reads value from the input field.
 * - If save === true, the task is pushed to the tasks array and saved to localStorage.
 * - When loading from localStorage we call addTask(taskText, false) to avoid duplication.
 */
function addTask(taskText = null, save = true) {
    // If no explicit taskText provided, read from input
    if (taskText === null) {
        taskText = taskInput.value.trim();
    } else {
        taskText = String(taskText).trim();
    }

    // Validate input
    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    // Create DOM element and append to list
    const li = createTaskElement(taskText);
    taskList.appendChild(li);

    // Save to tasks array and localStorage when requested
    if (save) {
        tasks.push(taskText);
        saveTasks();
    }

    // Clear and focus the input for next entry
    taskInput.value = '';
    taskInput.focus();
}

// Load tasks from the tasks array and render them (do NOT re-save while loading)
function loadTasks() {
    tasks.forEach(taskText => {
        addTask(taskText, false); // false prevents saving again to localStorage
    });
}

// Event listeners
addButton.addEventListener('click', function (event) {
    event.preventDefault(); // prevents any default button behavior
    addTask();
});

taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTask();
    }
});

// Initial render of persisted tasks
loadTasks();


});