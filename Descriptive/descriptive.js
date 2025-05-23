
// -------------------------------------------------------------------------------------------
const textarea = document.querySelector('textarea');
let timerStarted = false;
let countdown;
let totalSeconds = 600;
const allowedKeys = ['Backspace', ' ', 'Delete', 'Tab'];
const timerElement = document.getElementById('timer');

// 🔁 STEP 1: Mapping topic to time
const timeMap = {
  "Letter": 10 * 60,
  "Essay": 20 * 60,
  "Report": 20 * 60,
  "Email": 10 * 60,
  "Situation": 10 * 60
};


// 🧠 STEP 2: Update totalSeconds on button click
document.querySelectorAll('.custom-btn').forEach(button => {
  button.addEventListener('click', () => {
    const type = button.getAttribute('data-type');
    if (timeMap[type]) {
      totalSeconds = timeMap[type];
      timerStarted = false;
      clearInterval(countdown);
      timerElement.textContent = `Time left: ${String(Math.floor(totalSeconds / 60)).padStart(2, '0')}:${String(totalSeconds % 60).padStart(2, '0')}`;
    }
  });
});

// ✅ Clean double line spacing
textarea.addEventListener('input', function () {
  const value = textarea.value;
  if (value.includes('\n\n')) {
    textarea.value = value.replace(/\n\n+/g, '\n');
  }
});

// 🕒 START TIMER ON FOCUS
textarea.addEventListener('focus', function () {
  if (timerStarted) return;
  timerStarted = true;

  countdown = setInterval(function () {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    timerElement.textContent = `Time left: ${minutes}:${seconds}`;

    totalSeconds--;

    if (totalSeconds < 0) {
      clearInterval(countdown);
      handleSubmit(new Event('submit'));
    }
  }, 1000);
});

// 🔒 Prevent typing in between
textarea.addEventListener('keydown', e => {
  if ((textarea.selectionStart !== textarea.value.length) &&
      !['Backspace', 'Delete','ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
    e.preventDefault();
  }
});

/*
> 1. textarea.addEventListener('keydown', e => { ... })
  Jab bhi user textarea ke andar koi key press karega (keydown event), tab ye function chalega.

> keydown ek event hota hai jo key press karte hi trigger hota hai, aur us time hum apni marzi ka koi bhi action perform kar sakte hain
  ager cursor end mein nahi hai &&  Agar dabayi gayi key in allowed keys mein nahi hai: , to type hone se pehle hi stop ho jana hai.
*/


// 📨 Handle Submission
function handleSubmit(event) {
  event.preventDefault();

  const textarea = document.getElementById('descriptiveBox');
  const form = document.getElementById('descriptiveForm');
   const extraPrompt = "\n\nMarks out of 15, check spelling error, check grammar error";
  textarea.value = textarea.value.trim() + extraPrompt;

  navigator.clipboard.writeText(textarea.value)
    .then(() => {
      console.log('Text copied to clipboard!');
      form.submit();
    })
    .catch(() => {
      alert('Copy failed! But form will still be submitted.');
      form.submit();
    });
}




document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".custom-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const type = btn.getAttribute("data-type");
      window.location.href = `question.html?type=${type}`;
    });
  });
});



