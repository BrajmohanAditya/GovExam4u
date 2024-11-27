let targetPage = ""; // To store the target page URL
let targetPassword = ""; // To store the page's password

function openModal(anchor) {
    targetPage = anchor.href; // Store the URL
    targetPassword = anchor.getAttribute("data-password"); // Get the password from data attribute

    const savedData = JSON.parse(localStorage.getItem(targetPage)); // Get stored data
    if (savedData && savedData.unlocked && savedData.password === targetPassword) {
        // If password matches, unlock directly
        window.location.href = targetPage;
        return false;
    }

    // Show modal for password input
    document.getElementById("passwordModal").style.display = "block";
    return false; // Prevent default behavior
}

function closeModal() {
    document.getElementById("passwordModal").style.display = "none"; // Hide modal
    document.getElementById("modalPassword").value = ""; // Clear password input
}

function validatePassword() {
    const userPassword = document.getElementById("modalPassword").value;

    if (userPassword === targetPassword) {
        // Save access with the correct password
        localStorage.setItem(
            targetPage,
            JSON.stringify({ password: targetPassword, unlocked: true })
        );
        window.location.href = targetPage; // Redirect
    } else {
        alert("Incorrect password! Access denied.");
    }
}

// Clear all saved access
function clearAccess() {
    localStorage.clear();
    alert("All saved access has been cleared.");
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById("passwordModal");
    if (event.target === modal) {
        closeModal();
    }
};