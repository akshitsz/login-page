const form = document.getElementById('loginForm');
const username = document.getElementById('username');
const password = document.getElementById('password');
const spinner = document.getElementById('spinner');
const message = document.getElementById('message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (validateInputs()) {
        spinner.classList.remove('hidden');

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username.value,
                    password: password.value
                })
            });

            const data = await response.json();
            console.log("API Response:", data);
            spinner.classList.add('hidden');
            message.textContent = 'Login successful!';
            message.style.color = 'green';
        } catch (error) {
            spinner.classList.add('hidden');
            message.textContent = 'Login failed!';
            message.style.color = 'red';
        }
    }
});

function validateInputs() {
    let isValid = true;

    if (!username.value || !isValidEmail(username.value)) {
        showError(username, 'Please enter a valid email.');
        isValid = false;
    } else {
        hideError(username);
    }

    if (!password.value || password.value.length < 6) {
        showError(password, 'Password must be at least 6 characters long.');
        isValid = false;
    } else {
        hideError(password);
    }

    return isValid;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(input, message) {
    const inputGroup = input.parentElement;
    const small = inputGroup.querySelector('small');
    small.textContent = message;
    small.style.visibility = 'visible';
    input.style.borderColor = 'red';
}

function hideError(input) {
    const inputGroup = input.parentElement;
    const small = inputGroup.querySelector('small');
    small.style.visibility = 'hidden';
    input.style.borderColor = '#ddd';
}
