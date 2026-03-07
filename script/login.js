document.getElementById("login_btn").addEventListener("click", function () {
    // Get the username and password input values
    const username = document.getElementById("login_input").value;
    const password = document.getElementById("login_password").value;

    // Perform login validation (this is just a simple example, you should implement proper authentication)
    if (username === "admin" && password === "admin123") {
        // Redirect to another page or perform other actions after successful login
        window.location.assign("home.html"); // Example redirect to a dashboard page
    } else {
        alert("Invalid username or password. Please try again.");
    }
});