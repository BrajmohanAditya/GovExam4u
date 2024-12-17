

// Multiple password facility 


function initializePage() {
  const savedPasswords = JSON.parse(localStorage.getItem(passwordKey));
  if (!savedPasswords || !arraysEqual(savedPasswords, correctPasswords)) {
    localStorage.removeItem(storageKey);
    localStorage.setItem(passwordKey, JSON.stringify(correctPasswords));
  }

  const isPasswordVerified = localStorage.getItem(storageKey) === "true";
  if (isPasswordVerified) {
    showPage(3);
  }
}

function checkPassword(pageNum) {
  const isPasswordVerified = localStorage.getItem(storageKey) === "true";
  if (!isPasswordVerified) {
    document.getElementById("passwordModal").style.display = "flex";
    document.getElementById("passwordModal").setAttribute("data-page", pageNum);
  } else {
    showPage(pageNum);
  }
}

function validatePassword() {
  const enteredPassword = document.getElementById("passwordInput").value;
  const modal = document.getElementById("passwordModal");
  const pageNum = modal.getAttribute("data-page");

  if (correctPasswords.includes(enteredPassword)) {
    localStorage.setItem(storageKey, "true");
    modal.style.display = "none";
    showPage(pageNum);
    showPage(Number(pageNum)); // Show the desired page immediately
  } else {
    alert("Incorrect password. Please try again.");
  }
}

// Utility function to compare two arrays
function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  return a.every((value, index) => value === b[index]);
}

