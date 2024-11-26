let targetPage = ""; // To store the target page temporarily

function openModal(page) {
    targetPage = page; // Store the URL of the page to redirect to
    console.log("Target Page:", targetPage); // Debugging: Ensure targetPage is correct
    document.getElementById("passwordModal").style.display = "block";
}

function closeModal() {
    document.getElementById("passwordModal").style.display = "none";
    document.getElementById("modalPassword").value = ""; // Clear the password field
}

function validatePassword() {
    const correctPassword = "govexam"; // Replace with your desired password
    const userPassword = document.getElementById("modalPassword").value;
    if (userPassword === correctPassword) {
        console.log("Redirecting to:", targetPage); // Debugging: Check targetPage before redirection
        window.location.href = targetPage; // Redirect to the stored page
    } else {
        alert("Incorrect password! Access denied.");
    }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById("passwordModal");
    if (event.target === modal) {
        closeModal();
    }
};
