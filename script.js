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
