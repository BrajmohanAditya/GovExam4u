

// Function to initialize the page
function initializePage() {
  const savedPassword = localStorage.getItem(passwordKey);
  if (savedPassword !== correctPassword) {
    // Clear verification if the password has changed
    localStorage.removeItem(storageKey);
    localStorage.setItem(passwordKey, correctPassword); // Update stored password
  }

  const isPasswordVerified = localStorage.getItem(storageKey) === "true";
  if (isPasswordVerified) {
    showPage(3); // Automatically load the first page
  }
}

// Function to check the password
function checkPassword(pageNum) {
  const isPasswordVerified = localStorage.getItem(storageKey) === "true";
  if (!isPasswordVerified) { // Only show modal if not already verified
    document.getElementById("passwordModal").style.display = "flex";
    document.getElementById("passwordModal").setAttribute("data-page", pageNum);
  } else {
    showPage(pageNum); // Load page without asking for the password
  }
}

// Function to validate the password
function validatePassword() {
  const enteredPassword = document.getElementById("passwordInput").value;
  const modal = document.getElementById("passwordModal");
  const pageNum = modal.getAttribute("data-page");

  if (enteredPassword === correctPassword) {
    localStorage.setItem(storageKey, "true"); // Save verification in localStorage
    modal.style.display = "none"; // Hide the modal
    showPage(pageNum);
  } else {
    alert("Incorrect password. Please try again.");
  }
}