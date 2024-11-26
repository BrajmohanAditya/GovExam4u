// jo only button seh audio play hota hai uska js code hai

let currentAudio = null;

function toggleAudio(audioFile, button) {
  const audioPlayer = document.getElementById('audioPlayer');
  const audioSource = document.getElementById('audioSource');

  if (currentAudio === audioFile && !audioPlayer.paused) {
    audioPlayer.pause();
    button.innerHTML = '<i class="fas fa-play"></i>';
    button.classList.remove("playing");
  } else {
    if (currentAudio !== audioFile) {
      audioSource.src = audioFile;
      audioPlayer.load();
    }
    audioPlayer.play();

    const buttons = document.querySelectorAll(".audio-button");
    buttons.forEach((btn) => {
      btn.innerHTML = '<i class="fas fa-play"></i>'; 
      btn.classList.remove("playing");
    });

    button.innerHTML = 'Stop'; 
    button.classList.add("playing");

    currentAudio = audioFile;
  }
}

function fastForwardAudio() {
  const audioPlayer = document.getElementById('audioPlayer');
  if (!audioPlayer.paused) {
    audioPlayer.currentTime += 10; 
  }
}