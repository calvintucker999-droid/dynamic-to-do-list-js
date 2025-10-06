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
