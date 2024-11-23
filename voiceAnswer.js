//jo only button seh audio play hota hai uska js code hai


// let currentAudio = null;

// function toggleAudio(audioFile, button) {
//   const audioPlayer = document.getElementById('audioPlayer');
//   const audioSource = document.getElementById('audioSource');

//   if (currentAudio === audioFile && !audioPlayer.paused) {
//     audioPlayer.pause();
//     button.textContent = "Play";
//     button.classList.remove("playing");
//   } else {
//     if (currentAudio !== audioFile) {
//       audioSource.src = audioFile;
//       audioPlayer.load();
//     }
//     audioPlayer.play();

//     const buttons = document.querySelectorAll(".audio-button");
//     buttons.forEach((btn) => {
//       btn.textContent = "Play";
//       btn.classList.remove("playing");
//     });

//     button.textContent = "Stop";
//     button.classList.add("playing");

//     currentAudio = audioFile;
//   }
// }

let currentAudio = null;

function toggleAudio(audioFile, button) {
  const audioPlayer = document.getElementById('audioPlayer');
  const audioSource = document.getElementById('audioSource');

  if (currentAudio === audioFile && !audioPlayer.paused) {
    // Pause the audio
    audioPlayer.pause();
    button.innerHTML = '<i class="fas fa-play"></i>'; // Play icon
    button.classList.remove("playing");
  } else {
    // Play the new audio
    if (currentAudio !== audioFile) {
      audioSource.src = audioFile;
      audioPlayer.load();
    }
    audioPlayer.play();

    // Reset other buttons
    const buttons = document.querySelectorAll(".audio-button");
    buttons.forEach((btn) => {
      btn.innerHTML = '<i class="fas fa-play"></i>'; // Play icon
      btn.classList.remove("playing");
    });

    // Update current button
    button.innerHTML = 'Stop'; // Stop icon
    button.classList.add("playing");

    currentAudio = audioFile;
  }
}
