let currentAudio = null;

function toggleAudio(audioFile, button) {
  const audioPlayer = document.getElementById('audioPlayer');
  const audioSource = document.getElementById('audioSource');

  if (currentAudio && !audioPlayer.paused) {
    if (currentAudio === audioFile) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
      button.textContent = "Play";
      button.classList.remove("playing");
      currentAudio = null;
    } else {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
      const allButtons = document.querySelectorAll("button");
      allButtons.forEach(btn => {
        if (btn !== button) {
          btn.textContent = "Play";
          btn.classList.remove("playing");
        }
      });
      audioSource.src = audioFile;
      audioPlayer.load();
      audioPlayer.play();
      button.textContent = "Stop";
      button.classList.add("playing");
      currentAudio = audioFile;
    }
  } else {
    audioSource.src = audioFile;
    audioPlayer.load();
    audioPlayer.play();
    button.textContent = "Stop";
    button.classList.add("playing");
    currentAudio = audioFile;
  }
}