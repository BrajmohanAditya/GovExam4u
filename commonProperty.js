// Popuptext property 
function myFunction(popupId) {
    var popup = document.getElementById(popupId);
    var isVisible = popup.classList.contains("show");

    // Close any open popups
    var popups = document.getElementsByClassName("popuptext");
    for (var i = 0; i < popups.length; i++) {
        popups[i].classList.remove("show");
    }

    var popups = document.getElementsByClassName("popupdown");
    for (var i = 0; i < popups.length; i++) {
        popups[i].classList.remove("show");
    }

    // Toggle the clicked popup based on its previous state
    if (!isVisible) {
        popup.classList.add("show");
    }
}


// Change Button color
document.addEventListener('DOMContentLoaded', (event) => {
    const buttons = document.querySelectorAll('.colorButton');
    let currentlyClickedButton = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Reset the color of the previously clicked button
            if (currentlyClickedButton && currentlyClickedButton !== button) {
                currentlyClickedButton.classList.remove('clicked');
            }

            // Toggle the clicked class on the current button
            button.classList.toggle('clicked');

            // Update the currently clicked button
            currentlyClickedButton = button.classList.contains('clicked') ? button : null;
        });
    });
});

// revision Mode on of

document.getElementById('changeStyleBtn').addEventListener('click', function() {
    const hoverElements = document.querySelectorAll('.hover');
    const isOn = this.innerText.includes("On");

    // Toggle the changed class on each hover element
    hoverElements.forEach(function(hoverElement) {
        hoverElement.classList.toggle('changed');
    });

    // Update the button text inside the click handler
    this.innerText = isOn ? "Revision Mode: Off" : "Revision Mode: On";
});

// answer show karaga 
function toggleAnswer(answerId) {
    const answerDiv = document.getElementById(answerId);
    if (answerDiv.style.display === "none" || answerDiv.style.display === "") {
        answerDiv.style.display = "block"; // Show the answer
    } else {
        answerDiv.style.display = "none"; // Hide the answer
    }
}

// search bar ko active krna ka java script 

document.querySelector(".search-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get the search input value
    const searchInput = document.querySelector(".form-control").value.trim().toLowerCase();

    const totalPages = 70; // Total pages to search
    let found = false;

    // Search across all pages
    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        showPage(pageNum); // Load the page content

        const contentContainer = document.getElementById("contentContainer");
        
        if (contentContainer.textContent.toLowerCase().includes(searchInput)) {
            highlightWord(searchInput); // Highlight the word
            found = true;
            break; // Stop after finding the word
        }
    }

    // If the word is not found
    if (!found) {
        const contentContainer = document.getElementById("contentContainer");
        contentContainer.innerHTML = `<div>Sorry, "<strong>${searchInput}</strong>" not found on any page.</div>`;
    }
});

// Function to highlight the searched word
function highlightWord(word) {
    const contentContainer = document.getElementById("contentContainer");
    const regex = new RegExp(`\\b(${word})\\b`, "gi");

    contentContainer.innerHTML = contentContainer.innerHTML.replace(regex, `<span style="background-color: yellow;">$1</span>`);
}


// * end 




