// Popuptext property 
function myFunction(popupId) {
    var popup = document.getElementById(popupId);
    var isVisible = popup.classList.contains("show");

    // Close any open popups
    var popups = document.getElementsByClassName("popuptext");
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