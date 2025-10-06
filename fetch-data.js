async function fetchUserData() {
const apiUrl = '[https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)';
const dataContainer = document.getElementById('api-data');

```
try {
    const response = await fetch(apiUrl);

    // Check for non-OK HTTP status
    if (!response.ok) {
        throw new Error(`Network response was not ok (status: ${response.status})`);
    }

    const users = await response.json();

    // Clear loading text
    dataContainer.innerHTML = '';

    // Create a list and append user names
    const userList = document.createElement('ul');

    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user.name;
        userList.appendChild(li);
    });

    dataContainer.appendChild(userList);
} catch (error) {
    // Handle errors (network issues, JSON parse errors, etc.)
    dataContainer.innerHTML = '';
    dataContainer.textContent = 'Failed to load user data.';
    console.error('Error fetching user data:', error);
}
```

}

// Run the fetch after the DOM has loaded
document.addEventListener('DOMContentLoaded', function () {
fetchUserData();
});
