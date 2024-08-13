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